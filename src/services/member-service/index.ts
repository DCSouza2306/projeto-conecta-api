import { notFoundError } from "../../errors/not-found-error";
import groupRepository from "../../repositories/group-repository";
import memberRepository from "../../repositories/member-repository";
import roleRepository from "../../repositories/role-repository";

async function deleteMember(userId: number, groupId: number) {
 const member = await memberRepository.getMemberGroupByUserId(userId, groupId);

 if (!member) {
  throw notFoundError();
 }

 await memberRepository.deleteMember(member.id);
}

async function postMember(userId: number, groupId: number) {
 const groupExist = await groupRepository.getGroupById(groupId);

 if (!groupExist) {
  throw notFoundError();
 }

 const role = await roleRepository.getByName("member");

 const member = await memberRepository.createMember(userId, groupId, role.id)

 return member;

}

const memberService = {
 deleteMember,
 postMember,
};

export default memberService;
