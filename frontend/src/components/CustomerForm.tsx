import { Input, Button, Box } from "@chakra-ui/react";

export default function CustomerForm({
  customerId,
  setCustomerId,
  loading,
}: {
  customerId: string;
  setCustomerId: (value: string) => void;
  loading: boolean;
}) {
  return (
    <Box maxW="md" className="space-y-4">
      <Input
        placeholder="Enter Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <Button
        colorScheme="blue"
        isLoading={loading}
        disabled={!customerId}
        w="full"
      >
        Load Customer Data
      </Button>
    </Box>
  );
}
