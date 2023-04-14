import { prisma } from "../../config";

async function getByName(name: string){

    return prisma.role.findFirst({
        where: {name}
    })
}

const roleRepository = {
    getByName
};

export default roleRepository;