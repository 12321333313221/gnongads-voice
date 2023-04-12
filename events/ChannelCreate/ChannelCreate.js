class ChannelCreateController {
    constructor(db) {
        this.db = db;
    }
    getName() {
        return "channelCreateController";
    }
    async func(channel) {
        if (
            !channel ||
            !channel.parent ||
            channel.parentId != "972525524469571677"
        ) {
            return;
        }
        channel.setParent(channel.parentId, { lockPermissions: true });
    }
}

module.exports = ChannelCreateController;
