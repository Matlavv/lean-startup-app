import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { images } from '../../assets/images';
import TravelList from '@/components/sections/TravelList';

export default function TravelScreen() {
  return (
    <View className="flex-1">
      <View className="relative">
        <Image
          source={images.canyon}
          style={{
            height: 400,
            width: '100%',
            opacity: 0.8,
          }}
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center">
          <Text className="text-primary-pink text-7xl font-bold">RutaFem</Text>
        </View>
      </View>
      <View className="m-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-primary-black">
            Trajets disponibles
          </Text>
          <TouchableOpacity className="w-12 h-12 flex items-center justify-center bg-primary-blue rounded-full">
            <Text className="text-primary-white text-3xl font-bold">+</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          <TravelList />
        </View>
      </View>
    </View>
  );
}
