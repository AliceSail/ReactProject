import {
  Box,
  Text,
  Stack,
  Heading,
  Flex,
  Image,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const RecipePage = ({ selectedRecipe, onBackClick }) => {
  if (!selectedRecipe) {
    return <div>Select a recipe to view details.</div>;
  }

  const {
    label,
    image,
    mealType,
    totalTime,
    dietLabels,
    healthLabels,
    cautions,
    ingredientLines,
    yield: servings,
    totalNutrients,
  } = selectedRecipe;

  return (
    <Box bg="lightblue" h="100vh" p={4}>
      <Box bg="white" p={4} m="auto" maxW="900px" rounded="md">
        <Flex align="flex-start">
          <ArrowBackIcon boxSize={6} onClick={onBackClick} cursor="pointer" />
        </Flex>
        <Image
          src={image}
          alt={label}
          borderRadius="lg"
          w="900px"
          h="300px"
          objectFit="cover"
        />
        <Stack direction="row" spacing={2}>
          <VStack w="50%" align="left">
            <Text textTransform="uppercase">{mealType || "N/A"}</Text>
            <Heading as="h3" size="md">
              {label}
            </Heading>
            <Text>Total Cooking Time: {totalTime || "N/A"} minutes</Text>
            <Text>Servings: {servings || "N/A"}</Text>
            <Text>Ingredients:</Text>
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </VStack>
          <VStack w="50%" align="left">
            <Text>Health Labels:</Text>
            <div style={{ display: "grid", gap: "8px" }}>
              {groupLabels(healthLabels).map((rowLabels, rowIndex) => (
                <div key={rowIndex}>
                  {rowLabels.map((label, index) => (
                    <Box
                      bg="purple.100"
                      borderRadius="sm"
                      display="inline-block"
                      p={0.5}
                      m={1}
                      key={index}
                    >
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        fontWeight="bold"
                      >
                        {label}
                      </Text>
                    </Box>
                  ))}
                </div>
              ))}
            </div>
            <Text>Diet Labels:</Text>
            <div style={{ display: "grid", gap: "8px" }}>
              {groupLabels(dietLabels).map((rowLabels, rowIndex) => (
                <div style={{ display: "flex" }} key={rowIndex}>
                  {rowLabels.map((label, index) => (
                    <Box
                      bg="green.100"
                      borderRadius="sm"
                      display="inline-block"
                      p={0.5}
                      m={1}
                      key={index}
                    >
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        fontWeight="bold"
                      >
                        {label}
                      </Text>
                    </Box>
                  ))}
                </div>
              ))}
            </div>

            <Text>Cautions:</Text>
            <div style={{ display: "grid", gap: "8px" }}>
              {groupLabels(cautions).map((rowLabels, rowIndex) => (
                <div style={{ display: "flex" }} key={rowIndex}>
                  {rowLabels.map((label, index) => (
                    <Box
                      bg="red.100"
                      borderRadius="sm"
                      display="inline-block"
                      p={0.5}
                      m={1}
                      key={index}
                    >
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        fontWeight="bold"
                      >
                        {label}
                      </Text>
                    </Box>
                  ))}
                </div>
              ))}
            </div>
            <Text>Total Nutrients:</Text>
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              <li>
                Calories:{" "}
                {Math.round(totalNutrients.ENERC_KCAL.quantity) +
                  totalNutrients.ENERC_KCAL.unit || "N/A"}
              </li>
              <li>
                Protein:{" "}
                {Math.round(totalNutrients.PROCNT.quantity) +
                  totalNutrients.PROCNT.unit || "N/A"}
              </li>
              <li>
                Fat:{" "}
                {Math.round(totalNutrients.FAT.quantity) +
                  totalNutrients.FAT.unit || "N/A"}
              </li>
              <li>
                Carbs:{" "}
                {Math.round(totalNutrients.CHOCDF.quantity) +
                  totalNutrients.CHOCDF.unit || "N/A"}
              </li>
              <li>
                Cholesterol:{" "}
                {Math.round(totalNutrients.CHOLE.quantity) +
                  totalNutrients.CHOLE.unit || "N/A"}
              </li>
              <li>
                Sodium:{" "}
                {Math.round(totalNutrients.NA.quantity) +
                  totalNutrients.NA.unit || "N/A"}
              </li>
            </ul>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default RecipePage;

function groupLabels(labels) {
  const maxRowWidth = 500; // Adjust this width as needed
  let currentRow = [];
  const rows = [];

  labels.forEach((label) => {
    const labelWidth = label.length * 8; // Adjust this width calculation as needed

    if (
      currentRow.length === 0 ||
      currentRowWidth(currentRow) + labelWidth <= maxRowWidth
    ) {
      currentRow.push(label);
    } else {
      rows.push(currentRow);
      currentRow = [label];
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}

function currentRowWidth(row) {
  return row.reduce((totalWidth, label) => {
    return totalWidth + label.length * 10; // Adjust this width calculation as needed
  }, 0);
}
