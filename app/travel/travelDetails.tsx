import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { db } from '../../firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { images } from '../../assets/images';

export default function TravelDetails() {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoinTravel = async () => {
    setLoading(true);
    setError('');

    try {
      const travelRef = doc(db, 'rides', params.id as string);
      const travelSnap = await getDoc(travelRef);

      if (!travelSnap.exists()) {
        setError("Ce trajet n'existe plus");
        return;
      }

      const travelData = travelSnap.data();

      if (travelData.availableSeats < 1) {
        setError('Plus de places disponibles');
        return;
      }

      if (travelData.passengers.includes('1')) {
        setError('Vous participez déjà à ce trajet');
        return;
      }

      await updateDoc(travelRef, {
        availableSeats: travelData.availableSeats - 1,
        passengers: [...travelData.passengers, '1'],
      });

      router.push('/(tabs)/travel');
    } catch (err) {
      console.error('Error joining travel:', err);
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="relative">
        <Image
          source={images.canyon}
          style={{
            height: 200,
            width: '100%',
          }}
          className="rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="mt-6 space-y-6">
        <View>
          <Text className="text-2xl font-bold mb-2">Détails du trajet</Text>
          <View className="flex-row space-x-2">
            <Text className="text-lg font-bold">{params.departure}</Text>
            <Text className="text-lg">→</Text>
            <Text className="text-lg font-bold">{params.destination}</Text>
          </View>
        </View>

        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Date :</Text>
            <Text className="font-semibold">{params.date}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500">Heure :</Text>
            <Text className="font-semibold">{params.time}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500">Places disponibles :</Text>
            <Text className="font-semibold">{params.availableSeats}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500">Prix :</Text>
            <Text className="font-semibold">{params.price}€</Text>
          </View>
        </View>

        {error ? (
          <Text className="text-red-500 text-center">{error}</Text>
        ) : null}

        <TouchableOpacity
          className="bg-primary-pink rounded-full py-4 items-center mt-auto"
          onPress={handleJoinTravel}
          disabled={loading}
        >
          <Text className="text-white text-lg font-semibold">
            {loading ? 'Chargement...' : 'Rejoindre'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="absolute top-4 left-4"
        onPress={() => router.back()}
      >
        <Text className="text-2xl">←</Text>
      </TouchableOpacity>
    </View>
  );
}
