import moment from "moment";
import { ExtendClient } from "../../Client";
import { BaseModule, IBaseModule } from "../BaseModule";
const TextOnGif = require("text-on-gif");
async function sleep(ms: number) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve;
		}, ms);
	});
}
export class Banner extends BaseModule implements IBaseModule {
	private timeOut: ReturnType<typeof setTimeout> | undefined;
	constructor(client: ExtendClient) {
		super(client);
		this.timeOut = undefined;
	}

	private async writeBanner() {
		try {
			clearTimeout(this.timeOut);
			const guild = await this.client.guilds.fetch({
				"guild": this.client.mainGuild,
				"force": true
			});
			await guild.fetch();
			const countVoice = guild.voiceStates.cache.filter(e => e.channelId != null).size;
			const countMember = guild.approximateMemberCount;
			console.log(countVoice, countMember);
			const hour = moment().utc().hour();
			let imagePath = "C:\\banner\\day.gif";
			let new_imagePath = "C:\\banner\\new_day.gif";
			if (hour >= 19 || hour <= 3) {
				imagePath = "C:\\banner\\nigth.gif";
				new_imagePath = "C:\\banner\\new_nigth.gif";
			}
			console.log(imagePath);
			console.log(new_imagePath);
			if (countMember != null && countVoice != 0) {
				let pos = 454;
				if (countMember < 10) {
					pos = 470;
				}
				let gif = new TextOnGif({
					"file_path": imagePath,
					"font_color": "white",
					"font_size": "48px",
					"position_x": 100,
					"position_y": 50
					// path to local file, url or Buffer
				});
				console.log("Открыл");
				await gif.textOnGif({
					"text": `${countVoice}`,
					"get_as_buffer": false,
					"write_path": new_imagePath
				});
				console.log("Нарисов 1");
				gif = new TextOnGif({
					"file_path": new_imagePath,
					"font_color": "white",
					"font_size": "48px",
					"position_x": 63,
					"position_y": 20
					// path to local file, url or Buffer
				});
				console.log("открыл 2");
				const buff = await gif.textOnGif({
					"text": `${countMember}`,
					"get_as_buffer": true,
					"write_path": new_imagePath
				});
				console.log("Нарисов 2");
				// await guild.setBanner(buff);
				console.log("Опубликовал");
			}

		} catch (error) {
			console.log(error);
		}
		this.timeOut = setTimeout(async () => {
			try {
				await this.writeBanner();
			} catch (error) {
				console.log(error);
			}

		}, 1 * 60 * 1000);
	}
	public async init(): Promise<void> {
		await this.writeBanner();
		return;
	}
}