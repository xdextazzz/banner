import { Client, ClientOptions } from "discord.js";
import { Banner } from "./modules/Banner";
interface ExtendClientOptions extends ClientOptions{
    mongoUrl: string;
	prefix: string;
	mainGuild: string
}
export class ExtendClient extends Client {
	mainGuild: string;
	bannerModule: Banner;
	constructor(options: ExtendClientOptions) {
		super(options);
		this.mainGuild = options.mainGuild;
		this.bannerModule = new Banner(this);
	}
	/**
	 * Запустить бота
	 * init
	 * @param {string} token
	 */
	public async init(token: string): Promise<void> {

		await this.login(token);
		console.log(`Bot ${this.user?.username}#${this.user?.discriminator} logged in`);
		await this.bannerModule.init();
		console.log("Bot is loaded");
	}
}