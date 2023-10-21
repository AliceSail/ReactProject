import React from "react";
import { data } from "../utils/data";
import RecipePage from "./RecipePage";
import {
  Center,
  Image,
  Box,
  Text,
  Stack,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const RecipeListPage = ({ onRecipeSelect }) => {
  const initialRecipes = data.hits.map((hit) => hit.recipe);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);

  // Define filter states
  const [filters, setFilters] = React.useState({
    vegan: false,
    vegetarian: false,
    pescatarian: false,
  });

  const handleFilterChange = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter],
    });
  };

  // Filter recipes based on searchQuery and dietary filters
  const filteredRecipes = initialRecipes.filter((recipe) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const lowerRecipeName = recipe.label.toLowerCase();
    const healthLabels = recipe.healthLabels.map((label) =>
      label.toLowerCase()
    );

    return (
      (lowerRecipeName.includes(lowerSearchQuery) ||
        healthLabels.some((label) => label.includes(lowerSearchQuery))) &&
      (!filters.vegan || healthLabels.includes("vegan")) &&
      (!filters.vegetarian || healthLabels.includes("vegetarian")) &&
      (!filters.pescatarian || healthLabels.includes("pescatarian"))
    );
  });

  const navigateToRecipe = (recipe) => {
    onRecipeSelect(recipe);
    setSelectedRecipe(recipe);
  };

  return (
    <Center bgColor="lightblue" flexDirection="column" overflowY="auto">
      {selectedRecipe ? (
        <RecipePage
          selectedRecipe={selectedRecipe}
          onBackClick={() => setSelectedRecipe(null)}
        />
      ) : (
        <Box bgColor="lightblue" w="90%" p={4} borderRadius="lg">
          <Stack spacing={4}>
            <Heading size="lg" textAlign="center">
              My list of Recipes
            </Heading>
            <Flex justify="center">
              <input
                type="text"
                placeholder="Search recipes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "50%", padding: "10px" }}
              />
            </Flex>
          </Stack>

          {/* Filter buttons */}
          <Stack mt={6} spacing={12}>
            <Flex justify="center" flexWrap="wrap">
              <Button
                colorScheme={filters.vegan ? "teal" : "gray"}
                onClick={() => handleFilterChange("vegan")}
                marginLeft={2}
                marginRight={2}
              >
                Vegan
              </Button>
              <Button
                colorScheme={filters.vegetarian ? "teal" : "gray"}
                onClick={() => handleFilterChange("vegetarian")}
                marginLeft={2}
                marginRight={2}
              >
                Vegetarian
              </Button>
              <Button
                colorScheme={filters.pescatarian ? "teal" : "gray"}
                onClick={() => handleFilterChange("pescatarian")}
                marginLeft={2}
                marginRight={2}
              >
                Pescatarian
              </Button>
            </Flex>
          </Stack>

          <Stack mt={4} spacing={4}>
            <Flex justify="center" flexWrap="wrap">
              {filteredRecipes.map((recipe) => (
                <Box
                  key={recipe.label}
                  p={2}
                  m={2}
                  borderRadius="lg"
                  shadow="md"
                  bgColor="white"
                  w="300px"
                  h="auto"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigateToRecipe(recipe)}
                >
                  <Center>
                    <Image
                      src={recipe.image}
                      borderRadius="lg"
                      w="100%"
                      h="200px"
                      objectFit="cover"
                    />
                  </Center>
                  <Box textAlign="center">
                    <Text fontSize="xs" textTransform="uppercase">
                      {recipe.mealType}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                      {recipe.label}
                    </Text>
                    <Box
                      bg="purple.100"
                      borderRadius="sm"
                      display="inline-block"
                      p={0.5}
                      m={1}
                    >
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        fontWeight="bold"
                      >
                        {recipe.healthLabels
                          .filter((label) =>
                            ["Vegan", "Vegetarian"].includes(label)
                          )
                          .join(", ")}
                      </Text>
                    </Box>
                    {recipe.dietLabels && recipe.dietLabels.length > 0 && (
                      <Box
                        bg="green.100"
                        borderRadius="sm"
                        display="inline-block"
                        p={0.5}
                        m={1}
                      >
                        <Text
                          fontSize="xs"
                          textTransform="uppercase"
                          fontWeight="bold"
                        >
                          {`${recipe.dietLabels.join(", ")}`}
                        </Text>
                      </Box>
                    )}
                    <Text fontSize="sm">
                      {`Dish: ${
                        recipe.dishType
                          ? capitalizeFirstLetter(recipe.dishType[0])
                          : "N/A"
                      }`}
                    </Text>
                    {recipe.cautions && recipe.cautions.length > 0 && (
                      <Text fontSize="sm" color="black">
                        Cautions:
                      </Text>
                    )}
                    {recipe.cautions && recipe.cautions.length > 0 && (
                      <Box
                        bg="red.100"
                        borderRadius="sm"
                        display="inline-block"
                        p={0.5}
                        m={1}
                      >
                        <Text
                          fontSize="xs"
                          textTransform="uppercase"
                          fontWeight="bold"
                        >
                          {` ${recipe.cautions.join(", ") || "N/A"} `}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Flex>
          </Stack>
        </Box>
      )}
    </Center>
  );
};

export default RecipeListPage;
