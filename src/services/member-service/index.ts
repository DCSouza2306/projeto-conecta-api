import { notFoundError } from "../../errors/not-found-error";
import memberRepository from "../../repositories/member-repository";

async function deleteMember(userId: number, groupId: number) {
 const member = await memberRepository.getMemberGroupByUserId(userId, groupId);

 if (!member) {
  throw notFoundError()
 };

 await memberRepository.deleteMember(member.id)

}

const memberService = {
    deleteMember,
};

export default memberService;
