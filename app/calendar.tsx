import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario</Text>
      <Calendar
        theme={{
          backgroundColor: '#f0e4f7',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#8a2be2',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#8a2be2',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#8a2be2',
          selectedDotColor: '#ffffff',
          arrowColor: '#8a2be2',
          monthTextColor: '#4a0072',
          indicatorColor: 'blue',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a0072',
    padding: 20,
    textAlign: 'center',
  },
});

export default CalendarScreen;
