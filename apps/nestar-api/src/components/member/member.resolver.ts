import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMember } from '../auth/decoratots/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decoratots/roles.decorator';

import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Member)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		console.log('Mutation signup');
		console.log('input', input);
		return this.memberService.signup(input);
	}

	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		console.log('Mutation login');
		return this.memberService.login(input);
	}
  //Authenticated

	@UseGuards(AuthGuard)
	@Mutation(() => String)
	public async updateMember(@AuthMember() memberId: ObjectId): Promise<string> {
		console.log('Mutation updateMember');
		return this.memberService.updateMember();
	}



	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('Query getMember');
		return this.memberService.getMember();
	}


  /**ADMIN */
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
  @Mutation(() => String)
  public async getAllMembersByAdmin():Promise<string> {
		return this.memberService.getAllMembersByAdmin();
  }



	@Mutation(() => String)
	public async updateMemberByAdmin(): Promise<string> {
		console.log('Mutation updateMemberByAdmin');
		return this.memberService.updateMemberByAdmin();
	}
}