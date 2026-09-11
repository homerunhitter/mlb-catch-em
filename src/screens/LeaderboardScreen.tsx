import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@components/index';
import { apiService } from '@services/api';
import { Leaderboard } from '@types/index';

export const LeaderboardScreen: React.FC = () => {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await apiService.getLeaderboard(50);
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      // Use mock data for demo
      setLeaderboard([
        { rank: 1, username: 'LuisJG99', score: 5500, level: 15 },
        { rank: 2, username: 'BaseballFan22', score: 5200, level: 14 },
        { rank: 3, username: 'HomeRun88', score: 4800, level: 13 },
        { rank: 4, username: 'Player1', score: 2300, level: 8 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderLeaderboardItem = ({ item, index }: { item: Leaderboard; index: number }) => {
    const getMedalColor = (rank: number) => {
      switch (rank) {
        case 1:
          return '#FFD700'; // Gold
        case 2:
          return '#C0C0C0'; // Silver
        case 3:
          return '#CD7F32'; // Bronze
        default:
          return '#64748B';
      }
    };

    return (
      <View style={styles.leaderboardItem}>
        <Text style={[styles.rank, { color: getMedalColor(item.rank) }]}>#{item.rank}</Text>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.username}</Text>
          <Text style={styles.playerLevel}>Level {item.level}</Text>
        </View>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top Players</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E40AF" />
        </View>
      ) : (
        <FlatList
          data={leaderboard}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.rank.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <View style={styles.footer}>
        <Button
          title="Back to Home"
          onPress={() => router.push('/')}
          variant="secondary"
          size="large"
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1E40AF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#93C5FD',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1E40AF',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 50,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  playerLevel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
