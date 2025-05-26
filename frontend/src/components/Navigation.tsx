"use client";

import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm mb-8">
      <Flex gap={4} p={4} maxW="7xl" mx="auto">
        <Link href="/" passHref legacyBehavior>
          <Button as="a" colorScheme="blue" variant="ghost">
            Home
          </Button>
        </Link>
        <Link href="/customer" passHref legacyBehavior>
          <Button as="a" colorScheme="blue" variant="ghost">
            Customer
          </Button>
        </Link>
        <Link href="/top-products" passHref legacyBehavior>
          <Button as="a" colorScheme="blue" variant="ghost">
            Top Products
          </Button>
        </Link>
        <Link href="/analytics" passHref legacyBehavior>
          <Button as="a" colorScheme="blue" variant="ghost">
            Analytics
          </Button>
        </Link>
      </Flex>
    </nav>
  );
}
