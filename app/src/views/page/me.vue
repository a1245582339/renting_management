<template>
    <div>
        <van-cell-group>
            <van-cell :title="$t('user.id')" :value="user.id" />
            <van-cell :title="$t('user.name')" :value="user.name" />
            <van-cell :title="$t('user.sex')" :value="user.sex === 1 ? $t('user.male'): $t('user.female')" />
            <van-cell :title="$t('user.university')" :value="user.university_name" />
            <van-cell :title="$t('user.tel')" :value="user.tel" is-link @click="telShow = true" />
            <van-cell :title="$t('user.password')" :value="$t('user.change_password')" is-link @click="passShow = true" />
            <van-cell :title="$t('user.language')" is-link @click="lanShow = true" :value="language" />

            <van-popup v-model="lanShow" position="bottom" >
                <van-picker :columns="columns" show-toolbar @cancel="lanShow = false" @confirm="checkLanguage" />
            </van-popup>
        </van-cell-group>

        <van-dialog
            v-model="telShow"
            show-cancel-button
            :lazy-render="false"
            :confirm-button-text="$t('confirm')"
            :cancel-button-text="$t('cancel')"
            @confirm="submitTel"
        >
            <van-field
                v-model="tel"
                :label="$t('user.tel_dialog.label')"
                :placeholder="$t('user.tel_dialog.placeholder')"
            />
           
        </van-dialog>
        <van-dialog
            v-model="passShow"
            show-cancel-button
            :lazy-render="false"
            @confirm="submitPass"
            :confirm-button-text="$t('confirm')"
            :cancel-button-text="$t('cancel')"
        >
            <van-field
                v-model="password.old"
                :label="$t('user.password_dialog.label.old')"
                :placeholder="$t('user.password_dialog.label.old')"
            />
            <van-field
                v-model="password.new"
                :label="$t('user.password_dialog.label.new')"
                :placeholder="$t('user.password_dialog.label.new')"
            />
            <van-field
                v-model="password.repeat"
                :label="$t('user.password_dialog.label.repeat')"
                :placeholder="$t('user.password_dialog.label.repeat')"
            />
           
        </van-dialog>
    </div>
</template>
<script>
import { updateUserInfo, checkPassword } from '@/api/user'
import language from '@/json/language.json';
import { Toast } from 'vant';
import { getLanguage, setLanguage } from '@/utils/language';
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
            },
            lanShow: false,
            language: language.find(item => item.value === getLanguage()).text,
            columns: language
        }
    },
    methods: {
        async submitPass() {
            const password = this.password
            if (!password.old || !password.new || !password.repeat) {
                Toast.fail(this.$t('user.password_dialog.fail.empty'))
            } else if (password.new !== password.repeat) {
                Toast.fail(this.$t('user.password_dialog.fail.repeat'))
            } else if (!/^[a-zA-Z]\w{5,17}$/.test(password.new)) {
                Toast.fail(this.$t('user.password_dialog.fail.validate'))
            } else {
                const res = await checkPassword({id: this.user.id, password: password.old})
                if (res.data.code === 20000) {
                    await updateUserInfo(this.user.id, {password: password.new})
                    Toast.success(this.$t('user.success'))
                } else {
                    Toast.fail(this.$t('user.password_dialog.fail.error'))
                }
            }
        },
        async submitTel() {
            if (/^1(3|4|5|7|8)\d{9}$/.test(this.tel)) {
                await updateUserInfo(this.user.id, {tel: this.tel})
                Toast.success(this.$t('user.success'))
                this.user.tel = this.tel
                this.$store.commit('setUser', this.user)
            } else {
                Toast.fail(this.$t('user.tel_dialog.fail'))
            }
        },
        checkLanguage(language) {
            setLanguage(language.value)
            this.language = language.text
            Toast.success(this.$t('user.change_language'))
            this.lanShow = false
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
