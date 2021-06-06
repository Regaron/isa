import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const API_URI = "https://fakestoreapi.com";
const KEYS = ["/products", "/users"];

export default async function (req, res) {
  const responses = await Promise.all(KEYS.map((key) => fetch(API_URI + key)));
  const [products, users] = await Promise.all(
    responses.map((response) => response.json())
  );
  await Promise.all([
    prisma.product.createMany({
      data: products.map((product, index) => ({
        ...product,
        released: index % 3 !== 0,
      })),
    }),
    ...users.map(
      ({ address: { geolocation, ...address }, name, __v, ...user }) =>
        prisma.user.create({
          data: {
            ...user,
            address: {
              create: {
                ...address,
                geolocation: {
                  create: geolocation,
                },
              },
            },
            name: {
              create: name,
            },
          },
        })
    ),
  ]);
  res.json({ message: "Seed completed." });
}
