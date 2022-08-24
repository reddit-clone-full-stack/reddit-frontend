import { Body, Controller, Get, Post, Query } from "@nestjs/common"

import { CommunityService } from "./community.service"

@Controller("communityP")
export class CommunityP {
	constructor(private communityService: CommunityService) {}

	@Get()
	getCommunity(@Query("title") title) {
		return this.communityService.getCommunity(title)
	}
	@Get("popular")
	getPopularCommunities() {
		return this.communityService.getPopularCommunities()
	}

	@Post("bytitle")
	getCommunityByTitle(@Body() body: { title: string }) {
		return this.communityService.getCommunityByTitle(body.title)
	}
}
