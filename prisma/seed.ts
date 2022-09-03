import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        username: 'admin',
        email: 'admin@admin.lol',
        password: 'test',
        is_admin: true,
        assets: {
            create: [
                {
                    title: 'test',
                    blurb: 'test',
                    description: 'test',
                    html_description: 'test',
                    browse_url: 'https://github.com/prisma/prisma-examples',
                    is_published: true,
                    category_id: 1,
                    cost: 'MIT',
                    created_at: new Date().toISOString(),
                    modify_date: new Date().toISOString(),
                    asset_versions: {
                        create: [
                            {
                                godot_version: '3',
                                created_at: new Date().toISOString(),
                                modify_date: new Date().toISOString(),
                                version_string: '1.0.0',
                            },
                            {
                                godot_version: '4',
                                created_at: new Date().toISOString(),
                                modify_date: new Date().toISOString(),
                                version_string: '2.0.0',
                            }
                        ]
                    }
                }
            ]
        }
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })