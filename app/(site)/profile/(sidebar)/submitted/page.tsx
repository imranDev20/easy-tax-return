import prisma from "@/lib/prisma";
import UserSubmittedTaxReturns from "./_components/user-submitted-tax-returns";

async function getSubmittedTaxReturns() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        individualTaxes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching tax returns:", error);
    return [];
  }
}

export default async function UserSubmittedTaxReturnsPage() {
  const taxReturns = await getSubmittedTaxReturns();

  return <UserSubmittedTaxReturns taxReturns={taxReturns} />;
}
