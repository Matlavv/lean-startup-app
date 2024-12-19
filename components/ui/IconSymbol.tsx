// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'person.fill': 'person-sharp',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'car.fill': 'car',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    | React.ComponentProps<typeof MaterialIcons>['name']
    | React.ComponentProps<typeof Ionicons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons/Ionicons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  const mappedName = MAPPING[name];
  if (!mappedName) {
    console.warn(`No mapping found for icon: ${name}`);
    return null;
  }

  // Use Ionicons for specific icons
  if (mappedName === 'person-sharp') {
    return (
      <Ionicons name="person-sharp" size={size} color={color} style={style} />
    );
  }

  if (mappedName === 'car') {
    return <Ionicons name="car" size={size} color={color} style={style} />;
  }

  // Default to MaterialIcons
  return (
    <MaterialIcons
      name={mappedName as any}
      size={size}
      color={color}
      style={style}
    />
  );
}
