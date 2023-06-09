import {} from './RecipePage.styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from 'components/Loader/Loader';
import useWindowDimensions from 'hooks/useWindowDimensions';
import recipeMob from '../../images/mobile/recipe-bg375.jpg';
import recipeMob2x from '../../images/mobile/recipe-bg375-2x.jpg'
import recipeTab from '../../images/tablet/recipe-bg768.jpg';
import recipeTab2x from '../../images/tablet/recipe-bg768-2x.jpg'
import recipeDesk from '../../images/desktop/recipe-bg1440.jpg';
import recipeDesk2x from '../../images/desktop/recipe-bg1440-2x.jpg';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {RecipePreparation} from '../../components/Recipe/RecipePreparation';
import {IngredientsList} from '../../components/Recipe/IngredientsList'
import {RecipeWrap, RecipeHeroWrap, RecipeHeroBlock, RecipeTitle, RecipeDescription, RecipeAddToFavotite, RecipeTime} from './RecipePage.styled'
import { instance } from '../../redux/auth/authOperations';

export default function RecipePage() {
  const userId = useSelector(state => state.auth.user.id);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    instance
      .get(`/recipes/byId/${recipeId}`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [recipeId]);

  const handleFavoriteClick = () => {
    const isFavorite = favorites.includes(userId); 
    
    const request = isFavorite
      ? instance.delete(`/recipes/favorite/${recipeId}`)
      : instance.patch(`/recipes/favorite/${recipeId}`);
    
    request
      .then(() => {
           setRecipe(prevRecipe => ({
          ...prevRecipe,
          data: {
            ...prevRecipe.data,
            recipe: {
              ...prevRecipe.data.recipe,
              favorites: isFavorite
                ? prevRecipe.data.recipe.favorites.filter(id => id !== userId)
                : [...prevRecipe.data.recipe.favorites, userId],
            },
          },
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleIngredientToggle = (id, measure, isChecked) => {
    // console.log(id, measure, isChecked)
  };
  if (loading) {
    return <Loader />;
  }
  
  const { title, description, time, ingredients, instructions, thumb, favorites, measure, owner} = recipe.data.recipe;
  return (
  
    <>
    <RecipeWrap>
      <RecipeHeroWrap>
        {width < 768 ? (
          <img src={recipeMob} srcSet={`${recipeMob} 1x, ${recipeMob2x} 2x`} alt="background" width="455" />
        ) : width < 1440 ? (
          <img src={recipeTab}  srcSet={`${recipeTab} 1x, ${recipeTab2x} 2x`} alt="background" width="768" />
        ) : (
          <img src={recipeDesk} srcSet={`${recipeDesk} 1x, ${recipeDesk2x} 2x`} alt="background" width="1440" />
        )}
        <RecipeHeroBlock>
      <RecipeTitle>{title}</RecipeTitle>
      <RecipeDescription>{description}</RecipeDescription>
      {owner?.toString() !== userId && recipe && (
  <RecipeAddToFavotite onClick={handleFavoriteClick}>
    {favorites.includes(userId) ? 'Delete from favorites' : 'Add to favorites'}
  </RecipeAddToFavotite>
)}

      <RecipeTime key={recipeId}> <AiOutlineClockCircle style={{ marginRight: '8px' }} />{time} min</RecipeTime>
      </RecipeHeroBlock>А
      </RecipeHeroWrap>
      <IngredientsList
        ingredients={ingredients}
        measure={measure}
        onIngredientToggle={handleIngredientToggle}
      />
      <RecipePreparation instructions={instructions} thumb={thumb} title={title} />
      </RecipeWrap>
    </>
  );
}