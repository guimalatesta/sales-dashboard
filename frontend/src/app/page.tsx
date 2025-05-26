import Link from "next/link";
import { Button, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="text-center space-y-8">
      <Heading size="2xl">Sales & Revenue Dashboard</Heading>
      <div className="space-x-4">
        <Link href="/customer" passHref>
          <Button as="a" colorScheme="blue">
            Customer Dashboard
          </Button>
        </Link>
        <Link href="/top-products" passHref>
          <Button as="a" colorScheme="blue">
            Top Products
          </Button>
        </Link>
        <Link href="/analytics" passHref>
          <Button as="a" colorScheme="blue">
            Sales Analytics
          </Button>
        </Link>
      </div>
    </div>
  );
}
