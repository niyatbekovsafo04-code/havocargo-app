import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useApp } from '../contexts/AppContext';
import { theme } from '../constants/theme';
import { config, RoadDestination } from '../constants/config';

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, language } = useApp();

  const [destination, setDestination] = useState<RoadDestination>('dushanbe');
  const [weightStr, setWeightStr] = useState('');
  const [lengthStr, setLengthStr] = useState('');
  const [widthStr, setWidthStr] = useState('');
  const [heightStr, setHeightStr] = useState('');
  const [calculated, setCalculated] = useState(false);

  const getDestName = (dest: RoadDestination) => {
    const d = config.shipping.road.destinations[dest];
    if (language === 'en') return d.nameEn;
    return language === 'ru' ? d.nameRu : d.nameTj;
  };

  const w = parseFloat(weightStr) || 0;
  const l = parseFloat(lengthStr) || 0;
  const wd = parseFloat(widthStr) || 0;
  const h = parseFloat(heightStr) || 0;
  const hasDimensions = l > 0 && wd > 0 && h > 0;
  const volume = hasDimensions ? (l * wd * h) / 1000000 : 0;

  const airCost = w * config.shipping.air.pricePerKg;

  const roadDest = config.shipping.road.destinations[destination];
  const roadByVolume = volume * roadDest.pricePerCbm;
  const roadByWeight = w * roadDest.pricePerKg;
  const roadShipping = hasDimensions ? Math.max(roadByVolume, roadByWeight) : roadByWeight;
  const roadChargedBy = (hasDimensions && roadByVolume > roadByWeight) ? 'volume' : 'weight';
  const roadShippingTjs = roadShipping * config.shipping.exchangeRate;

  const handleCalculate = () => {
    if (w <= 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    Haptics.selectionAsync();
    setCalculated(true);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 16 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.closeBtn}>
              <MaterialIcons name="arrow-back" size={24} color={theme.textPrimary} />
            </Pressable>
            <Text style={styles.title}>{t('calcTitle')}</Text>
            <View style={{ width: 44 }} />
          </View>
          <Text style={styles.subtitle}>{t('calcSubtitle')}</Text>

          {/* Destination */}
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('destination')}</Text></View>
          <View style={styles.destRow}>
            {(['dushanbe', 'khorog'] as RoadDestination[]).map((dest) => {
              const isSelected = destination === dest;
              return (
                <Pressable key={dest} style={[styles.destPill, isSelected && styles.destPillActive]} onPress={() => { Haptics.selectionAsync(); setDestination(dest); setCalculated(false); }}>
                  <MaterialIcons name="location-on" size={16} color={isSelected ? '#FFF' : theme.textSecondary} />
                  <Text style={[styles.destPillText, isSelected && { color: '#FFF' }]}>{getDestName(dest)}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Weight */}
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('weight')} *</Text></View>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrap}>
              <MaterialIcons name="fitness-center" size={20} color={theme.textTertiary} />
              <TextInput style={styles.input} placeholder={t('weightPlaceholder')} placeholderTextColor={theme.textTertiary} value={weightStr} onChangeText={(v) => { setWeightStr(v); setCalculated(false); }} keyboardType="decimal-pad" />
              <Text style={styles.suffix}>kg</Text>
            </View>
          </View>

          {/* Dimensions */}
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('dimensions')} ({t('optional')})</Text></View>
          <View style={styles.inputGroup}>
            <View style={styles.dimRow}>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <TextInput style={styles.input} placeholder={t('length')} placeholderTextColor={theme.textTertiary} value={lengthStr} onChangeText={(v) => { setLengthStr(v); setCalculated(false); }} keyboardType="decimal-pad" />
              </View>
              <Text style={styles.dimX}>x</Text>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <TextInput style={styles.input} placeholder={t('width')} placeholderTextColor={theme.textTertiary} value={widthStr} onChangeText={(v) => { setWidthStr(v); setCalculated(false); }} keyboardType="decimal-pad" />
              </View>
              <Text style={styles.dimX}>x</Text>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <TextInput style={styles.input} placeholder={t('height')} placeholderTextColor={theme.textTertiary} value={heightStr} onChangeText={(v) => { setHeightStr(v); setCalculated(false); }} keyboardType="decimal-pad" />
              </View>
              <Text style={styles.suffix}>cm</Text>
            </View>
            {!hasDimensions ? (
              <View style={styles.dimWarning}>
                <MaterialIcons name="info-outline" size={14} color={theme.warning} />
                <Text style={styles.dimWarningText}>{t('noDimensions')}</Text>
              </View>
            ) : null}
          </View>

          {/* Calculate */}
          <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
            <Pressable style={[styles.calcBtn, w <= 0 && { opacity: 0.5 }]} onPress={handleCalculate} disabled={w <= 0}>
              <MaterialIcons name="calculate" size={20} color="#FFF" />
              <Text style={styles.calcBtnText}>{t('calculate')}</Text>
            </Pressable>
          </View>

          {/* Results */}
          {calculated && w > 0 ? (
            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>{t('comparison')}</Text>

              {/* Air */}
              <View style={[styles.resultCard, { borderColor: theme.primary + '40' }]}>
                <View style={styles.resultHeader}>
                  <View style={[styles.resultBadge, { backgroundColor: theme.primary }]}>
                    <MaterialIcons name="flight" size={14} color="#FFF" />
                    <Text style={styles.resultBadgeText}>{t('airCargo')}</Text>
                  </View>
                  <View style={styles.resultTag}>
                    <Text style={[styles.resultTagText, { color: theme.primary }]}>{t('faster')}</Text>
                  </View>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{t('shippingCostLabel')}:</Text>
                  <Text style={styles.resultValue}>{airCost} TJS</Text>
                </View>
                <View style={styles.resultDivider} />
                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { fontWeight: '700' }]}>{language === 'en' ? 'Total' : language === 'ru' ? '\u0418\u0442\u043E\u0433\u043E' : '\u04B6\u0430\u043C\u044A'}:</Text>
                  <Text style={[styles.resultValue, { color: theme.primary, fontSize: 18 }]}>{airCost} TJS</Text>
                </View>
                <Text style={styles.resultTransit}>{config.shipping.air.deliveryDaysMin}-{config.shipping.air.deliveryDaysMax} {t('days')}</Text>
              </View>

              {/* Road */}
              <View style={[styles.resultCard, { borderColor: theme.accent + '40' }]}>
                <View style={styles.resultHeader}>
                  <View style={[styles.resultBadge, { backgroundColor: theme.accent }]}>
                    <MaterialIcons name="local-shipping" size={14} color="#FFF" />
                    <Text style={styles.resultBadgeText}>{t('roadCargo')} {'\u2192'} {getDestName(destination)}</Text>
                  </View>
                  <View style={styles.resultTag}>
                    <Text style={[styles.resultTagText, { color: theme.accent }]}>{t('cheaper')}</Text>
                  </View>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{t('shippingCostLabel')} ({t(roadChargedBy === 'volume' ? 'byVolume' : 'byWeight')}):</Text>
                  <Text style={styles.resultValue}>${Math.round(roadShipping * 100) / 100} USD</Text>
                </View>
                {hasDimensions ? (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{t('volume')}:</Text>
                    <Text style={styles.resultValue}>{Math.round(volume * 10000) / 10000} m{'\u00B3'}</Text>
                  </View>
                ) : null}
                <View style={styles.resultDivider} />
                <View style={styles.resultRow}>
                  <Text style={[styles.resultLabel, { fontWeight: '700' }]}>{language === 'en' ? 'Total' : language === 'ru' ? '\u0418\u0442\u043E\u0433\u043E' : '\u04B6\u0430\u043C\u044A'}:</Text>
                  <Text style={[styles.resultValue, { color: theme.accent, fontSize: 18 }]}>${Math.round(roadShipping * 100) / 100} USD</Text>
                </View>
                <Text style={styles.resultTransit}>{roadDest.deliveryDaysMin}-{roadDest.deliveryDaysMax} {t('days')}</Text>
                <Text style={[styles.resultTransit, { color: theme.textTertiary }]}>
                  {'\u2248'} {Math.round(roadShippingTjs)} TJS ({language === 'en' ? 'approx' : language === 'ru' ? '\u043F\u0440\u0438\u0431\u043B' : '\u0442\u0430\u049B\u0440'}. 1 USD = {config.shipping.exchangeRate} TJS)
                </Text>
              </View>

              {/* Savings */}
              {airCost > roadShippingTjs ? (
                <View style={styles.savingsBox}>
                  <MaterialIcons name="savings" size={18} color={theme.success} />
                  <Text style={styles.savingsText}>
                    {language === 'en'
                      ? `Road saves you ~${Math.round(airCost - roadShippingTjs)} TJS but takes ${roadDest.deliveryDaysMin}-${roadDest.deliveryDaysMax} days longer`
                      : language === 'ru'
                      ? `\u0410\u0432\u0442\u043E \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0442 ~${Math.round(airCost - roadShippingTjs)} TJS, \u043D\u043E \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 ${roadDest.deliveryDaysMin}-${roadDest.deliveryDaysMax} \u0434\u043D\u0435\u0439`
                      : `\u0410\u0432\u0442\u043E ~${Math.round(airCost - roadShippingTjs)} TJS \u0441\u0430\u0440\u0444\u0430 \u043C\u0435\u043A\u0443\u043D\u0430\u0434, \u0430\u043C\u043C\u043E ${roadDest.deliveryDaysMin}-${roadDest.deliveryDaysMax} \u0440\u04EF\u0437 \u043C\u0435\u0433\u0438\u0440\u0430\u0434`}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundSecondary },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  closeBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: theme.radiusFull },
  title: { fontSize: 20, fontWeight: '800', color: theme.textPrimary },
  subtitle: { fontSize: 13, color: theme.textSecondary, paddingHorizontal: 16, marginBottom: 4 },
  sectionHeader: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: theme.textPrimary },
  destRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8 },
  destPill: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, backgroundColor: theme.surface, borderRadius: theme.radiusFull, borderWidth: 1.5, borderColor: theme.border },
  destPillActive: { backgroundColor: theme.accent, borderColor: theme.accent },
  destPillText: { fontSize: 14, fontWeight: '600', color: theme.textSecondary },
  inputGroup: { paddingHorizontal: 16, gap: 8 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, backgroundColor: theme.surface, borderRadius: theme.radiusMedium, borderWidth: 1, borderColor: theme.border, height: 48 },
  input: { flex: 1, fontSize: 14, color: theme.textPrimary, height: 48 },
  suffix: { fontSize: 13, fontWeight: '600', color: theme.textTertiary },
  dimRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dimX: { fontSize: 14, color: theme.textTertiary, fontWeight: '600' },
  dimWarning: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 4 },
  dimWarningText: { fontSize: 11, color: theme.warning, lineHeight: 15 },
  calcBtn: { flexDirection: 'row', height: 52, backgroundColor: theme.primary, borderRadius: theme.radiusMedium, alignItems: 'center', justifyContent: 'center', gap: 8 },
  calcBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  resultsSection: { paddingHorizontal: 16, paddingTop: 24, gap: 12 },
  resultsTitle: { fontSize: 18, fontWeight: '800', color: theme.textPrimary, marginBottom: 4 },
  resultCard: { backgroundColor: theme.surface, borderRadius: theme.radiusMedium, padding: 16, borderWidth: 1.5, gap: 6, ...theme.shadowLight },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  resultBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: theme.radiusFull },
  resultBadgeText: { fontSize: 12, fontWeight: '700', color: '#FFF' },
  resultTag: { backgroundColor: theme.surfaceSecondary, paddingHorizontal: 8, paddingVertical: 3, borderRadius: theme.radiusFull },
  resultTagText: { fontSize: 11, fontWeight: '700' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultLabel: { fontSize: 13, color: theme.textSecondary },
  resultValue: { fontSize: 14, fontWeight: '700', color: theme.textPrimary },
  resultDivider: { height: 1, backgroundColor: theme.border, marginVertical: 4 },
  resultTransit: { fontSize: 12, fontWeight: '600', color: theme.textSecondary, marginTop: 2 },
  savingsBox: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, backgroundColor: theme.successLight, borderRadius: theme.radiusMedium },
  savingsText: { flex: 1, fontSize: 13, color: theme.success, fontWeight: '600', lineHeight: 18 },
});
