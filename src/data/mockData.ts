import { Plant, ClinicalCase, NotificationItem } from '../types';

export const INITIAL_PLANTS: Plant[] = [
  {
    id: 'p1',
    name: 'Monstera Deliciosa',
    nickname: 'Monstera del Living',
    species: 'Monstera Deliciosa',
    location: 'Maceta Living Room · Sector Este',
    status: 'Saludable',
    progress: 75,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaN_A0pkaM4tPQfji-eFDgPkVsTmL_W6mhp-6XaueSllnEN4eVXtRtZyYGAU4cozPyRmgzq4dfUse8DFI41doam5NRu95WrI9CFviQSxZ3AAoEGTUYGQtXyzFmLjT3Pu6-azg2WqsVdpYJWMCcCDYAWbIM_C4xYS5FneQPtRZ-5tjcI06Ujletp71yVcMmquwdI964MoaWDLd3Nx1y96gWMqT5h0By_YLN9SeECO6n-5_2JA5SPZA2',
    nextWateringDays: 3,
    nextFertilizingDays: 6,
    exposure: '1 a 2 metros (Luz indirecta brillante)',
    wateringFrequency: '1 vez por semana',
    waterType: 'Canilla reposada',
    hasDrainageHoles: true,
    notes: 'El Ing. Agr. Emmanuel Hick MP 6254 está disponible hoy para diagnosticar cualquier síntoma en tus plantas.'
  },
  {
    id: 'p2',
    name: 'Ficus Lyrata',
    nickname: 'Ficus de la Biblioteca',
    species: 'Ficus Lyrata',
    location: 'Rincón Biblioteca · Maceta Cerámica',
    status: 'En Tratamiento',
    progress: 57,
    treatmentDay: 'Día 4/7',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAwGeX9l8ySbYdl_d4BPNGV-GODG2VruoPuvGniH7AZiFAQCr_CGTH69_5_A9whb9hGsQxv9AaLKua1t21JaZeA8aoCymkbypmG2q0cqlJbEhH42KA_0vtp3v7fAlnam6VYUl_3RTx2yntIVMifCvukzkYpinrCzHaXIJQWI3cl6K3X8EbA7SsvveG_ckRaJW8igdfUUkCyzouuqztpL94TSNfVEG-Erhm9UQt66q26fv08R_VIY3N',
    nextWateringDays: 5,
    nextFertilizingDays: 14,
    exposure: 'Pegado a ventana luminosa matutina',
    wateringFrequency: 'Cada 10-15 días',
    waterType: 'Lluvia o filtrada',
    hasDrainageHoles: true,
    notes: 'Tratamiento fitosanitario contra principio de ácaros en envés.'
  },
  {
    id: 'p3',
    name: 'Calathea Orbifolia',
    nickname: 'Calathea del Dormitorio',
    species: 'Calathea Orbifolia',
    location: 'Dormitorio Principal · Mesa Auxiliar',
    status: 'Atención',
    progress: 30,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAesu6mpEej_a0gvPfb5A0UV7R1PkOE-241l3BP4A4kmsPn8aCHbaT8aG1cfNylQRiBUwd3Jec0TZbeEWo5uUhVFSiGAbbQlKat7AjfWVNR95M7IK290UCiR_uDjIHreVhXlb3GcA8aXKJfwIrQk6QYYlR1L0PKd0wXyjQTTR24h4oxBX0N0Xlk69AKEgqHU1uLmD7JiSmTcXYBqKMbhFvo3ziYcEHpCMht6d2P-lsSfeyPW6Oq3BWi',
    nextWateringDays: 1,
    nextFertilizingDays: 20,
    exposure: 'Semisombra / luz tamizada 2.5m de ventana',
    wateringFrequency: 'Cada 3-4 días por inmersión',
    waterType: 'Agua desmineralizada',
    hasDrainageHoles: true,
    notes: 'Hojas con puntas secas y enrolladas. Tocar para enviar foto al botánico.'
  },
  {
    id: 'p4',
    name: 'Pothos Epipremnum',
    nickname: 'Pothos Colgante Cocina',
    species: 'Epipremnum Aureum',
    location: 'Estante Cocina · Luz Indirecta',
    status: 'Saludable',
    progress: 92,
    image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
    nextWateringDays: 4,
    nextFertilizingDays: 18,
    exposure: 'Luz media indirecta',
    wateringFrequency: 'Cada 7 días',
    waterType: 'Canilla reposada',
    hasDrainageHoles: true,
    notes: 'Crecimiento vegetativo continuo, esquejes en agua enraizando.'
  },
  {
    id: 'p5',
    name: 'Sansevieria Trifasciata',
    nickname: 'Espada de San Jorge Pasillo',
    species: 'Sansevieria Trifasciata',
    location: 'Pasillo Entrada · Maceta Arcilla',
    status: 'Saludable',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=600&q=80',
    nextWateringDays: 12,
    nextFertilizingDays: 45,
    exposure: 'Luz moderada',
    wateringFrequency: 'Cada 20 días',
    waterType: 'Canilla común',
    hasDrainageHoles: true,
    notes: 'Riego muy espaciado, tolera periodos de sequía sin estrés.'
  }
];

export const INITIAL_CASES: ClinicalCase[] = [
  {
    id: 'caso-842',
    plantId: 'p1',
    plantName: 'Monstera Deliciosa',
    species: 'Monstera Deliciosa',
    date: 'Hoy, 11:20 hs',
    status: 'En Tratamiento',
    symptoms: ['Hojas amarillas', 'Bichitos / pelusa', 'Puntas secas'],
    userQuery: 'Hola Emmanuel, hace unos 10 días empecé a notar que las hojas más nuevas de mi Monstera tienen manchas amarillas en las puntas y en el envés veo pequeños puntitos.',
    location: 'Interior con luz',
    evolutionTime: '1-2 semanas',
    photos: {
      general: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaN_A0pkaM4tPQfji-eFDgPkVsTmL_W6mhp-6XaueSllnEN4eVXtRtZyYGAU4cozPyRmgzq4dfUse8DFI41doam5NRu95WrI9CFviQSxZ3AAoEGTUYGQtXyzFmLjT3Pu6-azg2WqsVdpYJWMCcCDYAWbIM_C4xYS5FneQPtRZ-5tjcI06Ujletp71yVcMmquwdI964MoaWDLd3Nx1y96gWMqT5h0By_YLN9SeECO6n-5_2JA5SPZA2',
      symptom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXN7e8XUUhafu7m-T7rXoBZssLCbAAv42_vVa43E-I5UjrmlLh_tluCUNEY4VSmKI99WqRBj_Z45c08EuffdgXhHgAYEeDRBqtOzgU7P9YsWPi_yDiKoz-ju8Fa1GTDG1uSLQekbmM3RA5g8uh7qgq9obqUCfpRCjRzzR9FjA90F4BsWAJlkw38HJjD3-cBDVolsdWIAdqwr8EnWke_K7Hodbd9UIoHLzzJYKl2F193_G0cRzG15Z4',
      soil: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
      product: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
    },
    prescription: {
      folio: 'RX-2026-0842-MP6254',
      date: '27/09/2026',
      agronomist: 'Ing. Agr. Emmanuel Hick',
      matricula: 'MP 6254 - Colegio de Ingenieros Agrónomos',
      plantName: 'Monstera Deliciosa (Living)',
      species: 'Monstera Deliciosa Liebm.',
      diagnosis: 'Ataque incipiente de Arañuela Roja (Tetranychus urticae) favorecido por ambiente seco con calefacción cercana + estrés hídrico superficial.',
      severity: 'Moderado',
      activePrinciples: ['Jabón Potásico neutro al 2%', 'Aceite de Neem prensado en frío (Azadiractina)', 'Alcohol 70%'],
      treatmentSteps: [
        {
          step: 1,
          title: 'Limpieza Mecánica Foliar',
          instruction: 'Limpiar haz y envés con paño humedecido en agua destilada tibia y 2 gotas de jabón potásico para remover la capa de ácaros.',
          frequency: 'Día 1 y Día 4',
          completed: true
        },
        {
          step: 2,
          title: 'Pulverización con Fitoterápico',
          instruction: 'Pulverizar al atardecer Jabón Potásico (15 ml/L) + Neem (5 ml/L) en todo el follaje, prestando especial atención a pecíolos y envés.',
          frequency: 'Cada 4 días (4 aplicaciones en total)',
          completed: true
        },
        {
          step: 3,
          title: 'Aumento de Humedad Relativa',
          instruction: 'Ubicar bandeja con piedras volcánicas y agua bajo la maceta (sin que toque el fondo) para mantener HR > 60%.',
          frequency: 'Continuo durante 3 semanas',
          completed: false
        },
        {
          step: 4,
          title: 'Suspensión Temporal de Fertilizante',
          instruction: 'No aplicar abonos nitrogenados hasta que los brotes nuevos salgan completamente sanos.',
          frequency: 'Hasta el alta clínica',
          completed: false
        }
      ],
      wateringAdjustment: 'Espaciar riego a cuando los 3/4 superiores del sustrato estén secos. Agua reposada 24hs.',
      lightAdjustment: 'Mantener en luz indirecta brillante a 1.5 metros de ventana este. Evitar corrientes de aire caliente de radiadores.',
      observations: 'Pronóstico favorable: las nervaduras se encuentran sanas y no hay colapso vascular en tallo principal.',
      signatureUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApK0YoAoTFoHEv1FpV2oNTALnL2fd9-mxluGzvyl0hHVAD3KHauS_CsO10sD0zm2t4T21BiGaV54PVIjscOjZgs54o2q_zxhxATQ_oP6QPTrRvPIsmSgZjeNm8l30eRzqAzOxhm78Ea_bkR_PW3yjRBqMNgsInemkpKLX5fEHy0MxPBKh3L3WzX2YnooOG7Bvrzoc24m1WXKT7wP3dgjooYdjmtSPEmBZ3-vzBRc5WcbH4qwH09uyJ'
    },
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Hola Emmanuel, hace unos 10 días empecé a notar que las hojas más nuevas de mi Monstera tienen manchas amarillas en las puntas y en el envés veo pequeños puntitos. Adjunto fotos de hojas y sustrato.',
        timestamp: '11:20 hs'
      },
      {
        id: 'm2',
        sender: 'agronomist',
        text: 'Hola María. Recibí las 4 fotos y la ficha clínica. Se observa un micro-punteado típico de ácaro (arañuela roja) en etapa temprana. Es muy tratable antes de que afecte la vascularización.',
        timestamp: '11:42 hs'
      },
      {
        id: 'm3',
        sender: 'agronomist',
        text: 'Te emití la Receta Fitosanitaria Oficial con los 4 pasos terapéuticos. Empezá hoy mismo con la limpieza mecánica foliar y avisame cómo reacciona en 48hs.',
        timestamp: '11:45 hs'
      }
    ]
  },
  {
    id: 'caso-719',
    plantId: 'p2',
    plantName: 'Ficus Lyrata',
    species: 'Ficus Lyrata',
    date: '18 Sep, 16:40 hs',
    status: 'Respondida',
    symptoms: ['Hojas caídas', 'Puntas secas'],
    userQuery: 'Las dos hojas inferiores se cayeron de repente y las puntas de las intermedias tienen un color marrón opaco.',
    location: 'Interior con luz',
    evolutionTime: '2-3 semanas',
    photos: {
      general: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAwGeX9l8ySbYdl_d4BPNGV-GODG2VruoPuvGniH7AZiFAQCr_CGTH69_5_A9whb9hGsQxv9AaLKua1t21JaZeA8aoCymkbypmG2q0cqlJbEhH42KA_0vtp3v7fAlnam6VYUl_3RTx2yntIVMifCvukzkYpinrCzHaXIJQWI3cl6K3X8EbA7SsvveG_ckRaJW8igdfUUkCyzouuqztpL94TSNfVEG-Erhm9UQt66q26fv08R_VIY3N',
      symptom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdnaOlCBxAWG5qgoHlFfvmYOSFq9BSdL0r9GFSvh7_Ftfaq8NZRQnCvHSvdbXVXj5yoy6_jFLxduMnSGZoszRP9RV4L7j0BkwyAV_DsmN0Kahe0-TxCBFsQac-o694uBcwW4RPHZphrcYGXH6yntx5BIVzCIEsxVK3awtvoQgxMpjni2R_oTHezDf9HF4UgJga39l2uszadz4qb2kx45zNM_nGVZHYMTrO6uM7wbL4HmCbvQBqXeMG',
      soil: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
      product: ''
    },
    messages: [
      {
        id: 'm10',
        sender: 'user',
        text: 'Las dos hojas inferiores se cayeron de repente y las puntas de las intermedias tienen un color marrón opaco.',
        timestamp: '16:40 hs'
      },
      {
        id: 'm11',
        sender: 'agronomist',
        text: 'Hola María. El Ficus Lyrata resiente mucho el exceso de agua en la base de la maceta y los cambios de posición. Reducí el riego y evitá corrientes de aire.',
        timestamp: '17:15 hs'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Receta fitosanitaria emitida',
    description: 'El Ing. Agr. Emmanuel Hick emitió el protocolo RX-2026-0842 para tu Monstera.',
    time: 'Hace 35 min',
    type: 'diagnosis',
    read: false
  },
  {
    id: 'n2',
    title: 'Alerta estacional de calefacción',
    description: 'Baja humedad ambiental detectada. Aleja tus macetas de los radiadores directos.',
    time: 'Hoy, 09:00 hs',
    type: 'seasonal',
    read: false
  },
  {
    id: 'n3',
    title: 'Monstera Deliciosa: Riego sugerido',
    description: 'Verificá con la técnica del palillo de bambú si el sustrato ya secó en sus 2/3.',
    time: 'Ayer',
    type: 'watering',
    read: true
  }
];

export const AGRONOMIST_INFO = {
  name: 'Ing. Agr. Emmanuel Hick',
  matricula: 'MP 6254',
  role: 'Especialista en Sanidad Vegetal y Fitopatología',
  title: 'Botánico Validador Jefe · Asesor Técnico',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApK0YoAoTFoHEv1FpV2oNTALnL2fd9-mxluGzvyl0hHVAD3KHauS_CsO10sD0zm2t4T21BiGaV54PVIjscOjZgs54o2q_zxhxATQ_oP6QPTrRvPIsmSgZjeNm8l30eRzqAzOxhm78Ea_bkR_PW3yjRBqMNgsInemkpKLX5fEHy0MxPBKh3L3WzX2YnooOG7Bvrzoc24m1WXKT7wP3dgjooYdjmtSPEmBZ3-vzBRc5WcbH4qwH09uyJ',
  responseTime: '< 45 min',
  activeGuard: true
};

export const USER_INFO = {
  name: 'María',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLiU8aGotnU2ONKka89HJyZykAzL5UpoUhKjGmt3HuItsPtXVmof_SJcta5yi2FDvEMhh2ccV_S2TrNZT1K_UHQ4TprZdH6JMXTW8dPSJhDlOcvfGWXhUCRvudy71HgTewZCKJHcFH3S3cGbXm5aNqpuvmVCMTh9CtpcGlNddVzyF2Bpr9smM2Dliik2QzBj2NvVWewrlLuHvrIMP6rcTHwnZBqDRHzmkotf98lC84ilwbIM5HyCpl',
  plan: 'Membresía Clínica Botánica Activa'
};
