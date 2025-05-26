import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

export default function ProductsTable({
  loading,
  products,
}: {
  loading: boolean;
  products: Array<{
    productId: string;
    name: string;
    quantitySold: number;
    price: number;
  }>;
}) {
  return (
    <Table variant="simple" bg="white" boxShadow="md">
      <Thead>
        <Tr>
          <Th>Product</Th>
          <Th isNumeric>Quantity Sold</Th>
          <Th isNumeric>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {loading ? (
          <Tr>
            <Td colSpan={3}>
              <Skeleton height="20px" />
              <SkeletonText mt="4" noOfLines={3} spacing="4" />
            </Td>
          </Tr>
        ) : (
          products.map((product) => (
            <Tr key={product.productId}>
              <Td>{product.name}</Td>
              <Td isNumeric>{product.quantitySold}</Td>
              <Td isNumeric>${product.price.toFixed(2)}</Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
}
