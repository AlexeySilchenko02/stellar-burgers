import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { items, isLoading } = useSelector((state) => state.ingredients);
  const { id } = useParams<{ id: string }>();

  const ingredientData = items.find((item) => item._id === id);

  if (isLoading || items.length === 0) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return <Navigate to='/' replace />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
