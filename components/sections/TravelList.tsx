import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { images } from '../../assets/images';
import { db } from '../../firebaseConfig';
import {
  collection,
  query,
  getDocs,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

type Travel = {
  id: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  isActive: boolean;
};

export default function TravelList() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const ridesCollection = collection(db, 'rides');
        const q = query(ridesCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const travelsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          departure: doc.data().departure,
          destination: doc.data().destination,
          date: doc.data().date,
          time: doc.data().time,
          price: doc.data().price,
          availableSeats: doc.data().availableSeats,
          isActive: doc.data().isActive,
        }));

        setTravels(travelsList);
      } catch (error) {
        console.error('Error fetching travels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Chargement des trajets...</Text>
      </View>
    );
  }

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
                <View className="flex-row space-x-2">
                  <Text className="text-lg font-bold">{travel.departure}</Text>
                  <Text className="text-lg">→</Text>
                  <Text className="text-lg font-bold">
                    {travel.destination}
                  </Text>
                </View>
                <Text className="text-gray-500">
                  {travel.date} - {travel.time}
                </Text>
                <Text className="text-gray-500">
                  {travel.availableSeats} place
                  {travel.availableSeats > 1 ? 's' : ''} disponible
                  {travel.availableSeats > 1 ? 's' : ''}
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
