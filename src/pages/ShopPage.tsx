import React from 'react';
import { CardActionsProvider } from '../components/cards/CardActionsProvider';
import { ShopView } from '../components/shop/ShopView';

export function ShopPage() {
  return (
    <CardActionsProvider>
      <ShopView />
    </CardActionsProvider>);

}