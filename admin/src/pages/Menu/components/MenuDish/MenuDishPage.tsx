import MenuDishForm from './MenuDishForm';

export const MenuDishPage = () => {
  const HARDCODED_RESTAURANT_ID = "cce45739-fcb7-428d-991f-bdbe976d71e6";
  const id = HARDCODED_RESTAURANT_ID;
  return (
    <>
    {id}
    <MenuDishForm />
    </>
  )
}
