// // //Imports
// import {describe,it,expect} from 'vitest'
// import App from '../App'
// import { render, screen } from '@testing-library/react'
// //Test
// describe('Renders main page correctly',async()=>{
//     it('Should render the page correctly', async()=>{

//         //Inicio
//         render(<App/>)
//         const h4= await screen.queryByText('Menús')

//         //Comprobaciones
//         expect(h4).not.toBeNull()
//     })
// })

import { describe, it, expect } from 'vitest';
import App from '../App';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import FoodOrder from '../FoodOrder';
import Foods from '../Foods';

describe('Validaciones de la aplicación', () => {
  it('Debe mostrar cuatro productos en la carta inicial con stock, imagen y nombre', async () => {
    render(<App/>);

    // Verificar que hay cuatro productos en la carta con nombre, stock
    const products = await screen.findAllByRole('listitem');
    expect(products).toHaveLength(4);

    products.forEach(product => {
        const name = within(product).getByText(/Hamburguesa de/);
        const stock = within(product).getByText(/Disponible:/);
        expect(name).toBeInTheDocument();
        expect(stock).toBeInTheDocument();
      });

  });

  it('Debe mostrar cuatro productos con precios en la pantalla de Pedir Comida', async () => {
    render(<App />);

    const toggleButton = screen.getByText('Pedir Comida');
    fireEvent.click(toggleButton);

    const foodItems = await screen.findAllByRole('listitem');
    expect(foodItems).toHaveLength(4);

    foodItems.forEach(item => {
      const price = within(item).getByText(/€$/);
      expect(price).toBeInTheDocument();
    });
  });
  
});
