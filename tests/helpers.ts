import { prisma } from "@/config";

export async function cleanDb() {
 await prisma.book.deleteMany({});
 await prisma.author.deleteMany({});
 await prisma.bookLink.deleteMany({});
 await prisma.bookList.deleteMany({});
 await prisma.bookVote.deleteMany({});
 await prisma.user.deleteMany({});
 await prisma.group.deleteMany({});
 await prisma.groupLink.deleteMany({});
 await prisma.groupMember.deleteMany({});
 await prisma.listVote.deleteMany({});
 await prisma.meeting.deleteMany({});
 await prisma.meetingParticipant.deleteMany({});
 await prisma.readingList.deleteMany({});
}
