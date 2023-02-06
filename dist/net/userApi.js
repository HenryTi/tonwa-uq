import { CenterApiBase } from "./uqApi";
import { decodeUserToken, decodeGuestToken } from '../tool';
;
export class UserApi extends CenterApiBase {
    async login(params) {
        let ret = await this.post('user/login', params);
        switch (typeof ret) {
            default: return;
            case 'string': return decodeUserToken(ret);
            case 'object':
                let token = ret.token;
                let user = decodeUserToken(token);
                let { nick, icon } = ret;
                if (nick)
                    user.nick = nick;
                if (icon)
                    user.icon = icon;
                return user;
        }
    }
    async register(params) {
        return await this.post('user/register', params);
    }
    async changePassword(param) {
        return await this.post('tie/change-password', param);
    }
    async sendVerify(account, type, oem) {
        return await this.post('user/set-verify', { account: account, type: type, oem: oem });
    }
    async checkVerify(account, verify) {
        return await this.post('user/check-verify', { account: account, verify: verify });
    }
    async isExists(account) {
        return await this.get('user/is-exists', { account: account });
    }
    async resetPassword(account, password, verify, type) {
        return await this.post('user/reset-password', { account: account, password, verify, type });
    }
    async userSetProp(prop, value) {
        await this.post('tie/user-set-prop', { prop: prop, value: value });
    }
    async me() {
        return await this.get('tie/me');
    }
    async user(id) {
        return await this.get('tie/user', { id: id });
    }
    async fromKey(key) {
        return await this.get('tie/user-from-key', { key });
    }
    async guest() {
        let ret = await this.get('guest/', {});
        switch (typeof ret) {
            default: return;
            case 'string': return decodeGuestToken(ret);
            case 'object':
                let guest = decodeGuestToken(ret.token);
                return guest;
        }
    }
    async userQuit() {
        await this.get('tie/user-ask-quit', {});
    }
    async userAppUnits(app) {
        return await this.get('tie/user-app-units', { app: app });
    }
    async userFromKey(userName) {
        return await this.get('tie/user-from-key', { key: userName });
    }
    async userFromId(userId) {
        return await this.get('user/user-name-nick-icon-from-id', { userId: userId });
    }
    async userFromName(userName) {
        return await this.get('tie/user-from-key', { key: userName });
    }
    async usersFromEmail(email) {
        return await this.get('tie/users-from-email', { email });
    }
    async userFromMobile(mobile) {
        return await this.get('tie/users-from-mobile', { mobile });
    }
}
//# sourceMappingURL=userApi.js.map