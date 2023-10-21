import { useState } from "react";
import RecipeListPage from "./pages/RecipeListPage";
import RecipePage from "./pages/RecipePage";
import { data } from "./utils/data";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null); // Deselect the current recipe
  };

  return (
    <div>
      {selectedRecipe ? (
        <RecipePage
          selectedRecipe={selectedRecipe}
          onBackClick={handleBackClick}
        />
      ) : (
        <RecipeListPage
          onRecipeSelect={handleRecipeSelect}
          recipes={data.hits.map((hit) => hit.recipe)}
        />
      )}
    </div>
  );
};
