import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Linking, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useAlert } from '@/template';
import { useApp } from '../../contexts/AppContext';
import { theme } from '../../constants/theme';
import { config } from '../../constants/config';

const getIconSource = (id: string) => {
  if (id === 'pinduoduo') return require('../../assets/images/pinduoduo-icon.png');
  if (id === 'taobao') return require('../../assets/images/taobao-icon.png');
  return require('../../assets/images/1688-icon.png');
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, language, setLanguage } = useApp();
  const { showAlert } = useAlert();

  const copyAddress = async (address: string) => {
    await Clipboard.setStringAsync(address);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showAlert(t('copied'));
  };

  const openPlatformApp = async (platform: { scheme: string; storeUrl: string; webUrl: string }) => {
    Haptics.selectionAsync();
    try {
      const canOpen = await Linking.canOpenURL(platform.scheme);
      if (canOpen) {
        await Linking.openURL(platform.scheme);
      } else {
        await Linking.openURL(platform.storeUrl);
      }
    } catch {
      try {
        await Linking.openURL(platform.storeUrl);
      } catch {
        await Linking.openURL(platform.webUrl);
      }
    }
  };

  const iosPlatforms = config.chinesePlatforms.ios;
  const androidPlatforms = config.chinesePlatforms.android;

  const getWarehouseName = (wh: 'xian' | 'beijing') => {
    const info = config.warehouses[wh];
    if (language === 'en') return info.nameEn;
    return language === 'ru' ? info.nameRu : info.nameTj;
  };

  const airWarehouses = [
    { id: 'beijing', name: getWarehouseName('beijing'), address: config.warehouses.beijing.address, color: '#3B82F6' },
    { id: 'xian', name: getWarehouseName('xian'), address: config.warehouses.xian.address, color: '#F97316' },
  ];

  const roadWarehouse = {
    id: 'kashgar',
    name: language === 'en' ? config.warehouses.kashgar.nameEn : language === 'ru' ? config.warehouses.kashgar.nameRu : config.warehouses.kashgar.nameTj,
    address: config.warehouses.kashgar.address,
    color: '#F97316',
  };

  const protectionItems = [
    { icon: 'flight' as const, value: t('airShippingSummary'), desc: t('airShippingSummaryDesc'), color: theme.primary },
    { icon: 'local-shipping' as const, value: t('roadShippingSummary'), desc: t('roadShippingSummaryDesc'), color: theme.accent },
    { icon: 'verified' as const, value: t('inspectionService'), desc: t('inspectionServiceDesc'), color: '#8B5CF6' },
    { icon: 'shield' as const, value: t('guaranteeService'), desc: t('guaranteeServiceDesc'), color: '#10B981' },
  ];

  const renderPlatformRow = (
    platforms: typeof iosPlatforms,
    storeIcon: React.ReactNode,
    storeLabel: string,
  ) => (
    <View style={styles.storeSection}>
      <View style={styles.storeHeader}>
        {storeIcon}
        <Text style={styles.storeLabel}>{storeLabel}</Text>
      </View>
      <View style={styles.platformRow}>
        {platforms.map((platform) => (
          <Pressable key={platform.id} style={styles.platformCard} onPress={() => openPlatformApp(platform)}>
            <Image source={getIconSource(platform.id)} style={styles.platformIcon} contentFit="cover" transition={200} />
            <Text style={styles.platformName}>{platform.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: insets.bottom + 16 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.appName}>{t('appName')}</Text>
            <Text style={styles.tagline}>{t('appTagline')}</Text>
          </View>
          <Pressable style={styles.callBtn} onPress={() => { Haptics.selectionAsync(); Linking.openURL(`tel:${config.contact.phone}`); }}>
            <MaterialIcons name="phone" size={16} color="#FFF" />
            <Text style={styles.callBtnText}>24/7</Text>
          </Pressable>
          <Pressable style={styles.langToggle} onPress={() => { Haptics.selectionAsync(); const next = language === 'ru' ? 'tj' : language === 'tj' ? 'en' : 'ru'; setLanguage(next); }}>
            <MaterialIcons name="language" size={18} color={theme.primary} />
            <Text style={styles.langText}>{language === 'ru' ? 'TJ' : language === 'tj' ? 'EN' : 'RU'}</Text>
          </Pressable>
        </View>

        {/* Hero Banner */}
        <Pressable style={styles.heroBanner}>
          <Image source={require('../../assets/images/hero-cargo.png')} style={styles.heroImage} contentFit="cover" />
          <LinearGradient colors={['transparent', 'rgba(15, 23, 42, 0.85)']} style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroTag}>
              <MaterialIcons name="flight" size={14} color="#FFF" />
              <Text style={styles.heroTagText}>AIR CARGO</Text>
            </View>
            <Text style={styles.heroTitle}>{t('heroTitle')}</Text>
            <Text style={styles.heroSubtitle}>{t('heroSubtitle')}</Text>
          </View>
          <View style={styles.deliveryBadge}>
            <Text style={styles.deliveryDays}>3-7</Text>
            <Text style={styles.deliveryLabel}>{t('days')}</Text>
          </View>
        </Pressable>

        {/* Main Action Buttons */}
        <View style={styles.mainActions}>
          <Pressable style={styles.actionCard} onPress={() => { Haptics.selectionAsync(); router.push('/help-buy'); }}>
            <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.actionGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={styles.actionIconWrap}>
                <MaterialIcons name="support-agent" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionTitle}>{t('helpBuy')}</Text>
              <Text style={styles.actionDesc}>{t('helpBuyDesc')}</Text>
              <View style={styles.actionWhatsApp}>
                <FontAwesome5 name="whatsapp" size={14} color="#FFF" />
                <Text style={styles.actionWhatsAppText}>WhatsApp</Text>
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.actionCard} onPress={() => { Haptics.selectionAsync(); router.push('/self-buy'); }}>
            <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.actionGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={styles.actionIconWrap}>
                <MaterialIcons name="shopping-bag" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionTitle}>{t('selfBuy')}</Text>
              <Text style={styles.actionDesc}>{t('selfBuyDesc')}</Text>
              <View style={styles.actionWhatsApp}>
                <FontAwesome5 name="whatsapp" size={14} color="#FFF" />
                <Text style={styles.actionWhatsAppText}>WhatsApp</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Calculator */}
        <Pressable style={styles.calculatorBtn} onPress={() => { Haptics.selectionAsync(); router.push('/calculator'); }}>
          <View style={styles.calculatorIconWrap}>
            <MaterialIcons name="calculate" size={24} color={theme.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.calculatorTitle}>{t('calculator')}</Text>
            <Text style={styles.calculatorDesc}>{t('calculatorDesc')}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={theme.accent} />
        </Pressable>

        {/* Chinese Platform Apps */}
        <View style={styles.sectionHeader}>
          <MaterialIcons name="storefront" size={20} color={theme.textPrimary} />
          <Text style={styles.sectionTitle}>{t('shopOnChina')}</Text>
        </View>
        {renderPlatformRow(iosPlatforms, <MaterialIcons name="apple" size={22} color="#000" />, 'App Store')}
        {renderPlatformRow(
          androidPlatforms,
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png' }} style={{ width: 22, height: 22 }} contentFit="contain" />,
          'Google Play',
        )}

        {/* Air Cargo Warehouses */}
        <View style={styles.sectionHeader}>
          <MaterialIcons name="flight" size={20} color={theme.primary} />
          <Text style={styles.sectionTitle}>{t('airCargoWarehouses')}</Text>
        </View>
        {airWarehouses.map((wh) => (
          <View key={wh.id} style={styles.warehouseCard}>
            <View style={styles.warehouseHeader}>
              <View style={[styles.warehouseDot, { backgroundColor: wh.color }]} />
              <Text style={styles.warehouseName}>{wh.name}</Text>
            </View>
            <Text style={styles.warehouseAddress}>{wh.address}</Text>
            <Pressable style={[styles.copyButton, { borderColor: wh.color }]} onPress={() => copyAddress(wh.address)}>
              <MaterialIcons name="content-copy" size={16} color={wh.color} />
              <Text style={[styles.copyText, { color: wh.color }]}>{t('copyAddress')}</Text>
            </Pressable>
          </View>
        ))}

        {/* Road Cargo Warehouse */}
        <View style={styles.sectionHeader}>
          <MaterialIcons name="local-shipping" size={20} color={theme.accent} />
          <Text style={styles.sectionTitle}>{t('roadCargoWarehouse')}</Text>
        </View>
        <View style={styles.warehouseCard}>
          <View style={styles.warehouseHeader}>
            <View style={[styles.warehouseDot, { backgroundColor: theme.accent }]} />
            <Text style={styles.warehouseName}>{roadWarehouse.name}</Text>
          </View>
          <Text style={styles.warehouseAddress}>{roadWarehouse.address}</Text>
          <Pressable style={[styles.copyButton, { borderColor: theme.accent }]} onPress={() => copyAddress(roadWarehouse.address)}>
            <MaterialIcons name="content-copy" size={16} color={theme.accent} />
            <Text style={[styles.copyText, { color: theme.accent }]}>{t('copyAddress')}</Text>
          </Pressable>
        </View>

        {/* Shipping & Protection */}
        <View style={styles.sectionHeader}>
          <MaterialIcons name="local-shipping" size={20} color={theme.textPrimary} />
          <Text style={styles.sectionTitle}>{t('shippingAndProtection')}</Text>
        </View>
        <View style={styles.protectionGrid}>
          {protectionItems.map((item, idx) => (
            <View key={idx} style={styles.protectionCard}>
              <View style={[styles.protectionIcon, { backgroundColor: item.color + '15' }]}>
                <MaterialIcons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.protectionValue}>{item.value}</Text>
              <Text style={styles.protectionDesc} numberOfLines={3}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* Khorog Express */}
        <View style={styles.khorogExpressCard}>
          <View style={styles.khorogExpressHeader}>
            <MaterialIcons name="delivery-dining" size={20} color={theme.primary} />
            <Text style={styles.khorogExpressTitle}>{t('khorogExpress')}</Text>
          </View>
          <Text style={styles.khorogExpressDesc}>{t('khorogExpressDesc')}</Text>
        </View>

        {/* Contact Section */}
        <View style={styles.sectionHeader}>
          <MaterialIcons name="contact-support" size={20} color={theme.textPrimary} />
          <Text style={styles.sectionTitle}>{t('contactUs')}</Text>
        </View>
        <View style={styles.contactRow}>
          <Pressable style={[styles.contactCard, { borderColor: '#25D366' }]} onPress={() => { Haptics.selectionAsync(); Linking.openURL(config.contact.whatsapp); }}>
            <FontAwesome5 name="whatsapp" size={24} color="#25D366" />
            <Text style={styles.contactCardLabel}>WhatsApp</Text>
          </Pressable>
          <Pressable style={[styles.contactCard, { borderColor: '#E4405F' }]} onPress={() => { Haptics.selectionAsync(); Linking.openURL(config.contact.instagram); }}>
            <Ionicons name="logo-instagram" size={24} color="#E4405F" />
            <Text style={styles.contactCardLabel}>Instagram</Text>
          </Pressable>
          <Pressable style={[styles.contactCard, { borderColor: theme.primary }]} onPress={() => { Haptics.selectionAsync(); Linking.openURL(`tel:${config.contact.phone}`); }}>
            <MaterialIcons name="phone" size={24} color={theme.primary} />
            <Text style={styles.contactCardLabel}>24/7</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, gap: 8 },
  appName: { fontSize: 24, fontWeight: '800', color: theme.textPrimary, letterSpacing: -0.5 },
  tagline: { fontSize: 13, color: theme.textSecondary, marginTop: 2 },
  callBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#10B981', paddingHorizontal: 10, paddingVertical: 8, borderRadius: theme.radiusFull },
  callBtnText: { fontSize: 11, fontWeight: '700', color: '#FFF' },
  langToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.surfaceSecondary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: theme.radiusFull, gap: 4 },
  langText: { fontSize: 13, fontWeight: '700', color: theme.primary },
  heroBanner: { marginHorizontal: 16, height: 180, borderRadius: theme.radiusLarge, overflow: 'hidden', position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  heroContent: { position: 'absolute', bottom: 16, left: 16, right: 80 },
  heroTag: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  heroTagText: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.9)', letterSpacing: 1.5 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', lineHeight: 26 },
  heroSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  deliveryBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: theme.accent, borderRadius: theme.radiusMedium, paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center' },
  deliveryDays: { fontSize: 22, fontWeight: '800', color: '#FFF' },
  deliveryLabel: { fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' },

  // Main action buttons
  mainActions: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginTop: 20 },
  actionCard: { flex: 1, borderRadius: theme.radiusLarge, overflow: 'hidden', ...theme.shadowMedium },
  actionGradient: { padding: 16, alignItems: 'center', minHeight: 170, justifyContent: 'center' },
  actionIconWrap: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  actionTitle: { fontSize: 16, fontWeight: '800', color: '#FFF', textAlign: 'center', marginBottom: 4 },
  actionDesc: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 16, marginBottom: 8 },
  actionWhatsApp: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: theme.radiusFull },
  actionWhatsAppText: { fontSize: 11, fontWeight: '600', color: '#FFF' },

  // Calculator
  calculatorBtn: { flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 16, marginTop: 16, padding: 16, backgroundColor: '#FEF3C7', borderRadius: theme.radiusMedium, ...theme.shadowLight },
  calculatorIconWrap: { width: 44, height: 44, borderRadius: theme.radiusMedium, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
  calculatorTitle: { fontSize: 15, fontWeight: '700', color: theme.textPrimary, marginBottom: 2 },
  calculatorDesc: { fontSize: 12, color: theme.textSecondary },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: theme.textPrimary },

  storeSection: { marginHorizontal: 16, marginBottom: 10, backgroundColor: theme.surface, borderRadius: theme.radiusMedium, padding: 14, borderWidth: 1, borderColor: theme.border, ...theme.shadowLight },
  storeHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  storeLabel: { fontSize: 15, fontWeight: '700', color: theme.textPrimary },
  platformRow: { flexDirection: 'row', gap: 10 },
  platformCard: { flex: 1, alignItems: 'center', gap: 8 },
  platformIcon: { width: 52, height: 52, borderRadius: 14 },
  platformName: { fontSize: 12, fontWeight: '600', color: theme.textSecondary },

  warehouseCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: theme.surface, borderRadius: theme.radiusMedium, padding: 16, borderWidth: 1, borderColor: theme.border },
  warehouseHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  warehouseDot: { width: 10, height: 10, borderRadius: 5 },
  warehouseName: { fontSize: 15, fontWeight: '700', color: theme.textPrimary },
  warehouseAddress: { fontSize: 13, color: theme.textSecondary, lineHeight: 20, marginBottom: 12 },
  copyButton: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: theme.radiusFull, borderWidth: 1.5 },
  copyText: { fontSize: 13, fontWeight: '600' },

  protectionGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10 },
  protectionCard: { width: '47.5%', backgroundColor: theme.backgroundSecondary, borderRadius: theme.radiusMedium, padding: 14, gap: 6 },
  protectionIcon: { width: 40, height: 40, borderRadius: theme.radiusSmall, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  protectionValue: { fontSize: 14, fontWeight: '700', color: theme.textPrimary },
  protectionDesc: { fontSize: 11, color: theme.textSecondary, lineHeight: 15 },

  khorogExpressCard: { marginHorizontal: 16, marginTop: 16, padding: 14, backgroundColor: theme.infoLight, borderRadius: theme.radiusMedium, borderLeftWidth: 3, borderLeftColor: theme.primary },
  khorogExpressHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  khorogExpressTitle: { fontSize: 14, fontWeight: '700', color: theme.primary },
  khorogExpressDesc: { fontSize: 12, color: theme.primary, lineHeight: 18 },

  contactRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10 },
  contactCard: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface, borderRadius: theme.radiusMedium, paddingVertical: 16, borderWidth: 1.5, gap: 6, ...theme.shadowLight },
  contactCardLabel: { fontSize: 12, fontWeight: '600', color: theme.textSecondary },
});
