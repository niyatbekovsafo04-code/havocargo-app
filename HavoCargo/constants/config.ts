export const config = {
  appName: 'Havo Cargo',
  version: '1.0.0',
  defaultLanguage: 'ru' as const,

  warehouses: {
    xian: {
      id: 'xian',
      nameRu: 'Склад Сиань',
      nameTj: 'Анбори Сиань',
      nameEn: 'Xian Warehouse',
      address: '收货人：萨夫Havo Cargo\n联系方式：18899571951\n地址：陕西省咸阳市渭城区空港阳光里小区五期西区14号楼一单元102室\n(备注：+Ному насаб ва Телефони мобили)',
      city: 'Сиань',
      country: 'Китай',
      shippingMethod: 'air' as const,
    },
    beijing: {
      id: 'beijing',
      nameRu: 'Склад Пекин',
      nameTj: 'Анбори Пекин',
      nameEn: 'Beijing Warehouse',
      address: '收货人：萨夫Havo Cargo\n联系方式：16604185999\n地址：河北省廊坊市固安县建投御湖园小区1号\n(备注：+Ному насаб ва Телефони мобили)',
      city: 'Пекин',
      country: 'Китай',
      shippingMethod: 'air' as const,
    },
    kashgar: {
      id: 'kashgar',
      nameRu: 'Склад Кашгар',
      nameTj: 'Анбори Кошғар',
      nameEn: 'Kashgar Warehouse',
      address: '收货人: SAFOTRADEX\n联系方式: 19190265284\n新疆维吾尔自治区喀什地区喀什市经济开发区深圳产业园西区喀什远方国际物流港物流中心一期A区办公楼任聚酒店三楼305室中国（备注/заметка：ном+номер телефон+Душанбе ё Хараг)',
      city: 'Кашгар',
      country: 'Китай',
      shippingMethod: 'road' as const,
    },
    dushanbe: {
      id: 'dushanbe',
      nameRu: 'Склад Душанбе',
      nameTj: 'Анбори Душанбе',
      nameEn: 'Dushanbe Warehouse',
      address: 'ул. Рудаки 123, Душанбе, Таджикистан',
      city: 'Душанбе',
      country: 'Таджикистан',
      shippingMethod: 'air' as const,
    },
  },

  shipping: {
    air: {
      pricePerKg: 100,
      currency: 'TJS',
      deliveryDaysMin: 3,
      deliveryDaysMax: 7,
      procurementFeePerOrder: 10,
    },
    road: {
      destinations: {
        dushanbe: {
          nameRu: 'Душанбе',
          nameTj: 'Душанбе',
          nameEn: 'Dushanbe',
          pricePerCbm: 200,
          pricePerKg: 1,
          currency: 'USD',
          deliveryDaysMin: 25,
          deliveryDaysMax: 30,
        },
        khorog: {
          nameRu: 'Хорог',
          nameTj: 'Хоруғ',
          nameEn: 'Khorog',
          pricePerCbm: 190,
          pricePerKg: 0.9,
          currency: 'USD',
          deliveryDaysMin: 12,
          deliveryDaysMax: 20,
        },
      },
      procurementFeePerOrder: 10,
      procurementFeeCurrency: 'TJS',
    },
    inspectionPercent: 25,
    guaranteePercent: 15,
    exchangeRate: 11, // 1 USD = 11 TJS
    khorogExpress: {
      basePriceTJS: 50,
      baseWeightKg: 3,
      extraPerKgTJS: 10,
      deliveryDaysMin: 1,
      deliveryDaysMax: 2,
    },
  },

  contact: {
    phone: '+992501996604',
    whatsapp: 'https://wa.me/message/BE2R7MOBGQTWC1',
    instagram: 'https://www.instagram.com/havocargo?igsh=MXQxeDdxZWdzcHVscw%3D%3D&utm_source=qr',
  },

  chinesePlatforms: {
    ios: [
      {
        id: 'pinduoduo',
        name: 'Pinduoduo',
        color: '#E02E24',
        scheme: 'pinduoduo://',
        storeUrl: 'https://apps.apple.com/tj/app/%E6%8B%BC%E5%A4%9A%E5%A4%9A-%E5%A4%9A%E5%A4%9A%E4%B9%B0%E8%8F%9C-%E7%99%BE%E4%BA%BF%E8%A1%A5%E8%B4%B4/id1044283059',
        webUrl: 'https://www.pinduoduo.com',
      },
      {
        id: 'taobao',
        name: 'Taobao',
        color: '#FF6A00',
        scheme: 'taobao://',
        storeUrl: 'https://apps.apple.com/tj/app/taobao-online-shopping-app/id387682726',
        webUrl: 'https://www.taobao.com',
      },
      {
        id: '1688',
        name: '1688',
        color: '#FF7300',
        scheme: 'alibaba1688://',
        storeUrl: 'https://apps.apple.com/tj/app/1688-b2b-market/id507097717',
        webUrl: 'https://www.1688.com',
      },
    ],
    android: [
      {
        id: 'pinduoduo',
        name: 'Pinduoduo',
        color: '#E02E24',
        scheme: 'pinduoduo://',
        storeUrl: 'market://details?id=com.xunmeng.pinduoduo',
        webUrl: 'https://www.pinduoduo.com',
      },
      {
        id: 'taobao',
        name: 'Taobao',
        color: '#FF6A00',
        scheme: 'taobao://',
        storeUrl: 'https://play.google.com/store/apps/details?id=com.taobao.taobao',
        webUrl: 'https://www.taobao.com',
      },
      {
        id: '1688',
        name: '1688',
        color: '#FF7300',
        scheme: 'alibaba1688://',
        storeUrl: 'https://play.google.com/store/apps/details?id=com.alibaba.wireless',
        webUrl: 'https://www.1688.com',
      },
    ],
  },

  trackingStatuses: {
    air: [
      'order_received',
      'arrived_warehouse',
      'on_flight',
      'arrived_dushanbe',
      'out_for_delivery',
      'delivered',
    ] as const,
    road: [
      'order_received',
      'arrived_kashgar',
      'departed_kashgar',
      'at_border',
      'in_transit',
      'arrived_destination',
      'out_for_delivery',
      'delivered',
    ] as const,
  },
};

export type WarehouseId = keyof typeof config.warehouses;
export type AirTrackingStatus = (typeof config.trackingStatuses.air)[number];
export type RoadTrackingStatus = (typeof config.trackingStatuses.road)[number];
export type TrackingStatus = AirTrackingStatus | RoadTrackingStatus;
export type ShippingMethod = 'air' | 'road';
export type RoadDestination = 'dushanbe' | 'khorog';
