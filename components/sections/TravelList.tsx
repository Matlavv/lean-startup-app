import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { images } from '../../assets/images';

type Travel = {
  id: number;
  city: string;
  date: string;
  time: string;
  price: number;
};

const travels: Travel[] = [
  {
    id: 1,
    city: 'Lyon',
    date: '21/12/2024',
    time: '19h00',
    price: 36,
  },
  {
    id: 2,
    city: 'Paris',
    date: '22/12/2024',
    time: '08h30',
    price: 45,
  },
  {
    id: 3,
    city: 'Marseille',
    date: '23/12/2024',
    time: '14h15',
    price: 52,
  },
  {
    id: 4,
    city: 'Bordeaux',
    date: '24/12/2024',
    time: '10h45',
    price: 48,
  },
];

export default function TravelList() {
  return (
    <ScrollView className="space-y-4">
      {travels.map((travel) => (
        <View key={travel.id} className="bg-white p-4 rounded-2xl my-2">
          <TouchableOpacity className="flex-row items-center justify-between w-full">
            <View className="flex-row items-center space-x-4">
              <Image
                source={images.canyon}
                style={{
                  height: 60,
                  width: 60,
                }}
                className="rounded-xl"
                resizeMode="cover"
              />
              <View>
                <Text className="text-lg font-bold mb-1">{travel.city}</Text>
                <Text className="text-gray-500">
                  {travel.date} - {travel.time}
                </Text>
              </View>
            </View>
            <Text className="text-xl font-bold">{travel.price}€</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
