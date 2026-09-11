import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@components/index';
import { useGameStore } from '@/store/gameStore';

export const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { userProfile } = useGameStore();

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>User profile not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.avatarSection}>
        <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue}>{userProfile.username}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Level</Text>
            <Text style={styles.statValue}>{userProfile.level}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Rank</Text>
            <Text style={styles.statValue}>#{userProfile.rank}</Text>
          </View>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Total Score</Text>
          <Text style={styles.scoreValue}>{userProfile.totalScore.toLocaleString()}</Text>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.achievementsTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>🏆</Text>
              <Text style={styles.achievementName}>First Catch</Text>
            </View>
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>🔥</Text>
              <Text style={styles.achievementName}>10x Combo</Text>
            </View>
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>⚡</Text>
              <Text style={styles.achievementName}>Hard Mode Master</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Back to Home"
          onPress={() => router.push('/')}
          variant="secondary"
          size="large"
          style={{ width: '100%' }}
        />
      </View>
    </ScrollView>
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
  error: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginTop: 20,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#1E40AF',
  },
  infoSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1E40AF',
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#F59E0B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginTop: 4,
  },
  scoreCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginTop: 4,
  },
  achievementsSection: {
    marginTop: 20,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  achievementsList: {
    flexDirection: 'row',
    gap: 12,
  },
  achievement: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  achievementName: {
    fontSize: 10,
    color: '#CBD5E1',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
});
