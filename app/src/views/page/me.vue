<template>
    <div>
        <van-cell-group>
            <van-cell title="学号" :value="user.id" />
            <van-cell title="姓名" :value="user.name" />
            <van-cell title="性别" :value="user.sex === 1 ? '男': '女'" />
            <van-cell title="大学" :value="user.university_name" />
            <van-cell title="手机号" :value="user.tel" is-link @click="telShow = true" />
            <van-cell title="密码" value="修改密码" is-link @click="passShow = true" />
        </van-cell-group>
        <van-dialog
            v-model="telShow"
            show-cancel-button
            :lazy-render="false"
            @confirm="submitTel"
        >
            <van-field
            v-model="tel"
            :label="'手机号'"
            :placeholder="'请输入手机号'"
            />
           
        </van-dialog>
        <van-dialog
            v-model="passShow"
            show-cancel-button
            :lazy-render="false"
            @confirm="submitPass"
        >
            <van-field
                v-model="password.old"
                :label="'原密码'"
                :placeholder="'请输入原密码'"
            />
            <van-field
                v-model="password.new"
                :label="'新密码'"
                :placeholder="'请输入新密码'"
            />
            <van-field
                v-model="password.repeat"
                :label="'重复新密码'"
                :placeholder="'请输重复新密码'"
            />
           
        </van-dialog>
    </div>
</template>
<script>
import { updateUserInfo, checkPassword } from '@/api/user'
import { Toast } from 'vant';
export default {
    data() {
        return {
            user: {...this.$store.state.user},
            tel: this.$store.state.user.tel,
            telShow: false,
            passShow: false,
            password: {
                old: '',
                new: '',
                repeat: ''
            }
        }
    },
    methods: {
        async submitPass() {
            const password = this.password
            if (!password.old || !password.new || !password.repeat) {
                Toast.fail('密码不可为空！')
            } else if (password.new !== password.repeat) {
                Toast.fail('两次密码不一致！')
            } else if (!/^[a-zA-Z]\w{5,17}$/.test(password.new)) {
                Toast.fail('密码须以字母开头，长度在6~18之间，只能包含字母、数字和下划线！')
            } else {
                const res = await checkPassword({id: this.user.id, password: password.old})
                if (res.data.code === 20000) {
                    await updateUserInfo(this.user.id, {password: password.new})
                    Toast.success('修改成功！')
                } else {
                    Toast.fail('原密码错误！')
                }
            }
        },
        async submitTel() {
            if (/^1(3|4|5|7|8)\d{9}$/.test(this.tel)) {
                await updateUserInfo(this.user.id, {tel: this.tel})
                this.user.tel = this.tel
                this.$store.commit('setUser', this.user)
            } else {
                Toast.fail('请输入正确手机号')
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
