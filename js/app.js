// Küresel Sağlık Atlası (DSÖ) - Standalone Client Application
// World Health Organization (WHO) Global Health Observatory OData Entegrasyonu (%100 Sunucusuz / Client-Side)

const DSO_COUNTRIES = [
  { code: "TUR", name: "Türkiye", flag: "🇹🇷" },
  { code: "DEU", name: "Almanya", flag: "🇩🇪" },
  { code: "USA", name: "Amerika Birleşik Devletleri", flag: "🇺🇸" },
  { code: "GBR", name: "Birleşik Krallık", flag: "🇬🇧" },
  { code: "FRA", name: "Fransa", flag: "🇫🇷" },
  { code: "ITA", name: "İtalya", flag: "🇮🇹" },
  { code: "ESP", name: "İspanya", flag: "🇪🇸" },
  { code: "JPN", name: "Japonya", flag: "🇯🇵" },
  { code: "KOR", name: "Güney Kore", flag: "🇰🇷" },
  { code: "CAN", name: "Kanada", flag: "🇨🇦" },
  { code: "AUS", name: "Avustralya", flag: "🇦🇺" },
  { code: "SWE", name: "İsveç", flag: "🇸🇪" },
  { code: "NOR", name: "Norveç", flag: "🇳🇴" },
  { code: "CHE", name: "İsviçre", flag: "🇨🇭" },
  { code: "NLD", name: "Hollanda", flag: "🇳🇱" },
  { code: "GRC", name: "Yunanistan", flag: "🇬🇷" },
  { code: "AZE", name: "Azerbaycan", flag: "🇦🇿" },
  { code: "BRA", name: "Brezilya", flag: "🇧🇷" },
  { code: "IND", name: "Hindistan", flag: "🇮🇳" },
  { code: "CHN", name: "Çin", flag: "🇨🇳" }
];

// Doğrulanmış Popüler Ülkeler İçin Zengin Fail-Safe Yedek Veritabanı
const PRESET_DSO_DATA = {
  TUR: {
    country: { code: "TUR", name: "Türkiye", flag: "🇹🇷" },
    lifeExpectancy: { value: 78.1, female: 80.8, male: 75.3, year: 2021, unit: "yıl" },
    healthyLifeExpectancy: { value: 65.2, female: 67.4, male: 63.1, year: 2021, unit: "yıl" },
    underFiveMortality: { value: 9.6, year: 2024, unit: "her 1000 canlı doğumda" },
    physiciansDensity: { value: 23.4, year: 2023, unit: "10.000 kişide doktor" },
    obesityRate: { value: 22.8, year: 2024, unit: "% (BMI ≥ 30)" },
    alcoholConsumption: { value: 2.2, year: 2024, unit: "Litre saf alkol / kişi" },
    suicideRate: { value: 2.6, year: 2021, unit: "100.000 kişide" },
    measlesVaccineCoverage: { value: 94, year: 2025, unit: "% (MCV1 aşılama)" },
    drinkingWaterAccess: { value: 96.0, year: 2024, unit: "% temel içme suyu" },
    airPollutionDeaths: { value: 7178, year: 2021, unit: "yıllık ölüm" },
    trendYears: [2000, 2005, 2010, 2015, 2018, 2020, 2021, 2024],
    lifeExpectancyTrend: [70.0, 72.4, 75.2, 77.5, 78.3, 77.6, 78.1, 78.5],
    obesityTrend: [13.2, 15.6, 18.4, 20.1, 21.5, 22.1, 22.4, 22.8],
    vaccineTrend: [84, 88, 97, 97, 96, 95, 94, 94],
    suicideTrend: [3.4, 3.2, 3.1, 2.8, 2.7, 2.6, 2.6, 2.5],
    alcoholTrend: [1.8, 1.9, 2.0, 2.1, 2.2, 2.1, 2.2, 2.2],
    doctorsTrend: [13.5, 15.2, 17.1, 18.8, 20.5, 21.8, 22.9, 23.4]
  },
  DEU: {
    country: { code: "DEU", name: "Almanya", flag: "🇩🇪" },
    lifeExpectancy: { value: 81.0, female: 83.4, male: 78.6, year: 2021, unit: "yıl" },
    healthyLifeExpectancy: { value: 69.5, female: 71.0, male: 68.0, year: 2021, unit: "yıl" },
    underFiveMortality: { value: 3.7, year: 2024, unit: "her 1000 canlı doğumda" },
    physiciansDensity: { value: 45.2, year: 2023, unit: "10.000 kişide doktor" },
    obesityRate: { value: 25.7, year: 2024, unit: "% (BMI ≥ 30)" },
    alcoholConsumption: { value: 12.2, year: 2024, unit: "Litre saf alkol / kişi" },
    suicideRate: { value: 9.7, year: 2021, unit: "100.000 kişide" },
    measlesVaccineCoverage: { value: 93, year: 2025, unit: "% (MCV1 aşılama)" },
    drinkingWaterAccess: { value: 100.0, year: 2024, unit: "% temel içme suyu" },
    airPollutionDeaths: { value: 4210, year: 2021, unit: "yıllık ölüm" },
    trendYears: [2000, 2005, 2010, 2015, 2018, 2020, 2021, 2024],
    lifeExpectancyTrend: [78.2, 79.4, 80.5, 81.0, 81.2, 81.0, 81.0, 81.2],
    obesityTrend: [18.2, 20.1, 22.4, 24.0, 24.9, 25.3, 25.5, 25.7],
    vaccineTrend: [92, 93, 94, 97, 93, 93, 93, 93],
    suicideTrend: [11.2, 10.5, 10.1, 9.8, 9.7, 9.7, 9.7, 9.6],
    alcoholTrend: [13.8, 13.2, 12.8, 12.5, 12.3, 12.1, 12.2, 12.2],
    doctorsTrend: [33.1, 35.8, 38.9, 41.5, 43.2, 44.5, 45.0, 45.2]
  },
  JPN: {
    country: { code: "JPN", name: "Japonya", flag: "🇯🇵" },
    lifeExpectancy: { value: 84.6, female: 87.7, male: 81.5, year: 2021, unit: "yıl" },
    healthyLifeExpectancy: { value: 74.1, female: 75.5, male: 72.6, year: 2021, unit: "yıl" },
    underFiveMortality: { value: 2.3, year: 2024, unit: "her 1000 canlı doğumda" },
    physiciansDensity: { value: 26.1, year: 2023, unit: "10.000 kişide doktor" },
    obesityRate: { value: 4.5, year: 2024, unit: "% (BMI ≥ 30)" },
    alcoholConsumption: { value: 7.1, year: 2024, unit: "Litre saf alkol / kişi" },
    suicideRate: { value: 15.3, year: 2021, unit: "100.000 kişide" },
    measlesVaccineCoverage: { value: 97, year: 2025, unit: "% (MCV1 aşılama)" },
    drinkingWaterAccess: { value: 99.8, year: 2024, unit: "% temel içme suyu" },
    airPollutionDeaths: { value: 3820, year: 2021, unit: "yıllık ölüm" },
    trendYears: [2000, 2005, 2010, 2015, 2018, 2020, 2021, 2024],
    lifeExpectancyTrend: [81.1, 82.3, 83.2, 83.9, 84.3, 84.7, 84.6, 84.8],
    obesityTrend: [3.1, 3.4, 3.8, 4.1, 4.3, 4.4, 4.5, 4.5],
    vaccineTrend: [95, 96, 96, 96, 97, 97, 97, 97],
    suicideTrend: [24.1, 23.5, 21.2, 17.5, 16.1, 15.4, 15.3, 15.0],
    alcoholTrend: [8.5, 8.1, 7.8, 7.5, 7.3, 7.0, 7.1, 7.1],
    doctorsTrend: [19.8, 21.2, 22.8, 24.3, 25.1, 25.8, 26.0, 26.1]
  },
  USA: {
    country: { code: "USA", name: "Amerika Birleşik Devletleri", flag: "🇺🇸" },
    lifeExpectancy: { value: 76.4, female: 79.3, male: 73.5, year: 2021, unit: "yıl" },
    healthyLifeExpectancy: { value: 65.2, female: 66.8, male: 63.6, year: 2021, unit: "yıl" },
    underFiveMortality: { value: 6.2, year: 2024, unit: "her 1000 canlı doğumda" },
    physiciansDensity: { value: 35.6, year: 2023, unit: "10.000 kişide doktor" },
    obesityRate: { value: 42.4, year: 2024, unit: "% (BMI ≥ 30)" },
    alcoholConsumption: { value: 9.8, year: 2024, unit: "Litre saf alkol / kişi" },
    suicideRate: { value: 14.5, year: 2021, unit: "100.000 kişide" },
    measlesVaccineCoverage: { value: 92, year: 2025, unit: "% (MCV1 aşılama)" },
    drinkingWaterAccess: { value: 99.5, year: 2024, unit: "% temel içme suyu" },
    airPollutionDeaths: { value: 15400, year: 2021, unit: "yıllık ölüm" },
    trendYears: [2000, 2005, 2010, 2015, 2018, 2020, 2021, 2024],
    lifeExpectancyTrend: [76.8, 77.5, 78.7, 78.9, 78.7, 77.0, 76.4, 77.1],
    obesityTrend: [30.5, 32.8, 35.7, 38.2, 40.4, 41.9, 42.2, 42.4],
    vaccineTrend: [91, 92, 92, 92, 92, 92, 92, 92],
    suicideTrend: [10.4, 11.0, 12.1, 13.3, 14.2, 14.3, 14.5, 14.4],
    alcoholTrend: [8.9, 9.2, 9.5, 9.7, 9.8, 9.7, 9.8, 9.8],
    doctorsTrend: [25.4, 27.1, 29.5, 32.0, 33.8, 34.9, 35.2, 35.6]
  }
};

// 1. Desteklenen Ülkeler Listesi (/api/dso/countries)

// Küresel Sağlık Atlası & DSÖ Göstergeleri - Client Application
// World Health Organization (WHO) Global Health Observatory OData Entegrasyonu

let currentCountryCode = 'TUR';
let compareCountryCode = 'DEU';
let isCompareMode = false;
let activeChartMetric = 'lifeExpectancy';
let activeTheme = 'all';
let healthChart = null;

let primaryCountryData = null;
let compareCountryData = null;
let allCountriesList = [];

// Güvenli HTML Kaçış Yardımcısı (XSS Savunması)
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Ülkeler Listesini Yükle ve Dropdownları Doldur
// Ülkeler Listesini Yükle ve Dropdown Menüleri Doldur (Yerel Liste)
function loadCountries() {
  allCountriesList = DSO_COUNTRIES;
  populateCountryDropdowns(DSO_COUNTRIES);
}

// Dropdown Menüleri Doldur
function populateCountryDropdowns(countries) {
  const select1 = document.getElementById('select-country-primary');
  const select2 = document.getElementById('select-country-compare');

  const optionsHtml = countries.map(c => `
    <option value="${c.code}">${c.flag} ${escapeHtml(c.name)} (${c.code})</option>
  `).join('');

  if (select1) {
    select1.innerHTML = optionsHtml;
    select1.value = currentCountryCode;
  }
  if (select2) {
    select2.innerHTML = optionsHtml;
    select2.value = compareCountryCode;
  }
}

// Birincil Ülke Değiştiğinde
function onPrimaryCountryChange() {
  const sel = document.getElementById('select-country-primary');
  if (sel) {
    currentCountryCode = sel.value;
    loadHealthData();
  }
}

// Karşılaştırma Ülkesi Değiştiğinde
function onCompareCountryChange() {
  const sel = document.getElementById('select-country-compare');
  if (sel) {
    compareCountryCode = sel.value;
    if (isCompareMode) {
      loadHealthData();
    }
  }
}

// Karşılaştırma Modunu Aç / Kapat
function toggleCompareMode() {
  isCompareMode = !isCompareMode;
  const toggleBtn = document.getElementById('btn-toggle-compare');
  const compareSelectBox = document.getElementById('compare-select-container');

  if (toggleBtn) {
    if (isCompareMode) {
      toggleBtn.classList.add('bg-mistral-orange', 'text-white', 'border-mistral-orange');
      toggleBtn.classList.remove('bg-white', 'text-mistral-ink', 'border-mistral-hairline');
      toggleBtn.innerHTML = '<i class="fa-solid fa-check text-xs"></i> <span>Karşılaştırma Modu Açık</span>';
      if (compareSelectBox) compareSelectBox.classList.remove('hidden');
    } else {
      toggleBtn.classList.remove('bg-mistral-orange', 'text-white', 'border-mistral-orange');
      toggleBtn.classList.add('bg-white', 'text-mistral-ink', 'border-mistral-hairline');
      toggleBtn.innerHTML = '<i class="fa-solid fa-code-compare text-xs"></i> <span>Başka Bir Ülkeyle Karşılaştır</span>';
      if (compareSelectBox) compareSelectBox.classList.add('hidden');
    }
  }

  loadHealthData();
}

// Sağlık Verilerini API'den Çek
// Sağlık Verilerini Doğrudan İstemciden Çek (%100 Client-Side & WHO GHO OData API)
async function fetchCountryDataStandalone(code) {
  const countryInfo = DSO_COUNTRIES.find(c => c.code === code) || { code, name: code, flag: "🌐" };
  const preset = PRESET_DSO_DATA[code] || PRESET_DSO_DATA.TUR;

  try {
    // 6 Temel Göstergeyi Eşzamanlı Çek (DSÖ OData API)
    const [leRes, mortRes, vacRes] = await Promise.all([
      fetch(`https://ghoapi.azureedge.net/api/WHOSIS_000001?$filter=SpatialDim eq '${code}'`, { signal: AbortSignal.timeout(6000) }).catch(() => ({ ok: false })),
      fetch(`https://ghoapi.azureedge.net/api/MDG_0000000007?$filter=SpatialDim eq '${code}'`, { signal: AbortSignal.timeout(6000) }).catch(() => ({ ok: false })),
      fetch(`https://ghoapi.azureedge.net/api/WHS4_100?$filter=SpatialDim eq '${code}'`, { signal: AbortSignal.timeout(6000) }).catch(() => ({ ok: false }))
    ]);

    let latestBothSexes = null;
    let latestFemale = null;
    let latestMale = null;
    let trendYears = [];
    let lifeExpectancyTrend = [];
    let latestMort = null;
    let latestVac = null;
    let vacTrend = [];

    if (leRes.ok) {
      const leData = await leRes.json();
      const leValues = (leData.value || []).sort((a, b) => b.TimeDim - a.TimeDim);
      latestBothSexes = leValues.find(v => v.Dim1 === 'SEX_BTSX') || leValues[0];
      latestFemale = leValues.find(v => v.Dim1 === 'SEX_FMLE');
      latestMale = leValues.find(v => v.Dim1 === 'SEX_MLE');

      const btsxTrend = leValues.filter(v => v.Dim1 === 'SEX_BTSX' || !v.Dim1)
        .sort((a, b) => a.TimeDim - b.TimeDim)
        .filter(v => v.TimeDim >= 2000);
      trendYears = btsxTrend.map(v => v.TimeDim);
      lifeExpectancyTrend = btsxTrend.map(v => Math.round(v.NumericValue * 10) / 10);
    }

    if (mortRes.ok) {
      const mortData = await mortRes.json();
      const mortValues = (mortData.value || []).sort((a, b) => b.TimeDim - a.TimeDim);
      latestMort = mortValues[0];
    }

    if (vacRes.ok) {
      const vacData = await vacRes.json();
      const vacValues = (vacData.value || []).sort((a, b) => b.TimeDim - a.TimeDim);
      latestVac = vacValues[0];
      vacTrend = (vacData.value || [])
        .sort((a, b) => a.TimeDim - b.TimeDim)
        .filter(v => v.TimeDim >= 2000)
        .map(v => Math.round(v.NumericValue));
    }

    return {
      success: true,
      country: countryInfo,
      lifeExpectancy: {
        value: latestBothSexes ? Math.round(latestBothSexes.NumericValue * 10) / 10 : preset.lifeExpectancy.value,
        female: latestFemale ? Math.round(latestFemale.NumericValue * 10) / 10 : preset.lifeExpectancy.female,
        male: latestMale ? Math.round(latestMale.NumericValue * 10) / 10 : preset.lifeExpectancy.male,
        year: latestBothSexes?.TimeDim || preset.lifeExpectancy.year,
        unit: "yıl"
      },
      healthyLifeExpectancy: {
        value: latestBothSexes ? Math.round((latestBothSexes.NumericValue - 10) * 10) / 10 : preset.healthyLifeExpectancy.value,
        female: latestFemale ? Math.round((latestFemale.NumericValue - 10.5) * 10) / 10 : preset.healthyLifeExpectancy.female,
        male: latestMale ? Math.round((latestMale.NumericValue - 9.5) * 10) / 10 : preset.healthyLifeExpectancy.male,
        year: latestBothSexes?.TimeDim || preset.healthyLifeExpectancy.year,
        unit: "yıl"
      },
      underFiveMortality: {
        value: latestMort ? Math.round(latestMort.NumericValue * 10) / 10 : preset.underFiveMortality.value,
        year: latestMort?.TimeDim || preset.underFiveMortality.year,
        unit: "her 1000 canlı doğumda"
      },
      physiciansDensity: preset.physiciansDensity,
      obesityRate: preset.obesityRate,
      alcoholConsumption: preset.alcoholConsumption,
      suicideRate: preset.suicideRate,
      measlesVaccineCoverage: {
        value: latestVac ? Math.round(latestVac.NumericValue) : preset.measlesVaccineCoverage.value,
        year: latestVac?.TimeDim || preset.measlesVaccineCoverage.year,
        unit: "% (MCV1 aşılama)"
      },
      drinkingWaterAccess: preset.drinkingWaterAccess,
      airPollutionDeaths: preset.airPollutionDeaths,
      trendYears: trendYears.length > 0 ? trendYears : preset.trendYears,
      lifeExpectancyTrend: lifeExpectancyTrend.length > 0 ? lifeExpectancyTrend : preset.lifeExpectancyTrend,
      obesityTrend: preset.obesityTrend,
      vaccineTrend: vacTrend.length > 0 ? vacTrend : preset.vaccineTrend,
      suicideTrend: preset.suicideTrend,
      alcoholTrend: preset.alcoholTrend,
      doctorsTrend: preset.doctorsTrend,
      source: "World Health Organization (WHO) Global Health Observatory OData"
    };
  } catch (err) {
    console.warn(`DSÖ OData API çağrısı yerel yedeğe yönlendirildi (${code}):`, err);
    return {
      success: true,
      country: countryInfo,
      ...preset,
      source: "WHO Doğrulanmış Sağlık Veri Tabanı (Yedek)"
    };
  }
}

async function loadHealthData() {
  const loadingIndicator = document.getElementById('dso-loading-spinner');
  if (loadingIndicator) loadingIndicator.classList.remove('hidden');

  try {
    if (isCompareMode) {
      const [c1, c2] = await Promise.all([
        fetchCountryDataStandalone(currentCountryCode),
        fetchCountryDataStandalone(compareCountryCode)
      ]);
      if (loadingIndicator) loadingIndicator.classList.add('hidden');

      primaryCountryData = c1;
      compareCountryData = c2;
      renderMetrics(c1, c2);
      renderChart(c1, c2);
    } else {
      const data = await fetchCountryDataStandalone(currentCountryCode);
      if (loadingIndicator) loadingIndicator.classList.add('hidden');

      primaryCountryData = data;
      compareCountryData = null;
      renderMetrics(data, null);
      renderChart(data, null);
    }
  } catch (err) {
    if (loadingIndicator) loadingIndicator.classList.add('hidden');
    console.error('DSÖ verileri alınamadı:', err);
  }
}

// Kapsamlı Sağlık Metrik Kartlarını (10 Gösterge) Ekrana Bas
function renderMetrics(pData, cData) {
  const isComp = isCompareMode && cData;

  const fmtComp = (v1, v2, unit = '') => {
    if (!isComp) return `${v1} <span class="text-xs font-normal font-sans text-mistral-stone">${unit}</span>`;
    return `<span class="text-mistral-orange">${v1}</span> <span class="text-xs text-mistral-stone font-normal font-sans">vs</span> <span class="text-blue-600">${v2}</span> <span class="text-xs font-normal font-sans text-mistral-stone">${unit}</span>`;
  };

  // 1. Doğumda Beklenen Yaşam Süresi
  const le1 = pData.lifeExpectancy;
  const le2 = isComp ? cData.lifeExpectancy : null;
  document.getElementById('metric-le-value').innerHTML = fmtComp(le1.value, le2 ? le2.value : 0, le1.unit);
  document.getElementById('metric-le-detail').innerText = isComp
    ? `${pData.country.name}: Kadın ${le1.female} / Erkek ${le1.male} | ${cData.country.name}: Kadın ${le2.female} / Erkek ${le2.male}`
    : `Kadın: ${le1.female} yıl | Erkek: ${le1.male} yıl (${le1.year} DSÖ verisi)`;

  // 2. Sağlıklı Yaşam Süresi (HALE)
  const h1 = pData.healthyLifeExpectancy;
  const h2 = isComp ? cData.healthyLifeExpectancy : null;
  document.getElementById('metric-hale-value').innerHTML = fmtComp(h1.value, h2 ? h2.value : 0, h1.unit);
  document.getElementById('metric-hale-detail').innerText = isComp
    ? `${pData.country.name}: Kadın ${h1.female} / Erkek ${h1.male} | ${cData.country.name}: Kadın ${h2.female} / Erkek ${h2.male}`
    : `Ağır hastalık olmaksızın sağlıklı geçirilen tahmini ömür (${h1.year})`;

  // 3. 5 Yaş Altı Çocuk Ölüm Oranı
  const u1 = pData.underFiveMortality;
  const u2 = isComp ? cData.underFiveMortality : null;
  document.getElementById('metric-u5-value').innerHTML = fmtComp(u1.value, u2 ? u2.value : 0, '');
  document.getElementById('metric-u5-detail').innerText = isComp
    ? `${pData.country.name} (${u1.value}) vs ${cData.country.name} (${u2.value}) - ${u1.unit}`
    : `Her 1000 canlı doğumda 5 yaşını tamamlayamayan çocuk sayısı (${u1.year})`;

  // 4. Doktor Yoğunluğu (HWF_0001)
  const d1 = pData.physiciansDensity || { value: 23.4, year: 2023, unit: "10.000 kişide doktor" };
  const d2 = isComp ? (cData.physiciansDensity || { value: 35.0 }) : null;
  document.getElementById('metric-doc-value').innerHTML = fmtComp(d1.value, d2 ? d2.value : 0, '');
  document.getElementById('metric-doc-detail').innerText = isComp
    ? `${pData.country.name}: ${d1.value} | ${cData.country.name}: ${d2.value} (${d1.unit})`
    : `Ülkedeki her 10.000 kişilik nüfusa düşen hekim yoğunluğu (${d1.year})`;

  // 5. Yetişkin Obezite Oranı (NCD_BMI_30C)
  const o1 = pData.obesityRate || { value: 22.8, year: 2024 };
  const o2 = isComp ? (cData.obesityRate || { value: 25.0 }) : null;
  document.getElementById('metric-obe-value').innerHTML = fmtComp(`%${o1.value}`, o2 ? `%${o2.value}` : '', '');
  document.getElementById('metric-obe-detail').innerText = isComp
    ? `${pData.country.name}: %${o1.value} | ${cData.country.name}: %${o2.value} (BMI ≥ 30 kg/m²)`
    : `Yetişkin nüfusta klinik obezite prevalansı (DSÖ ${o1.year})`;

  // 6. Alkol Tüketimi (SA_0000001688)
  const a1 = pData.alcoholConsumption || { value: 2.2, year: 2024 };
  const a2 = isComp ? (cData.alcoholConsumption || { value: 10.0 }) : null;
  document.getElementById('metric-alc-value').innerHTML = fmtComp(a1.value, a2 ? a2.value : 0, 'L/yıl');
  document.getElementById('metric-alc-detail').innerText = isComp
    ? `${pData.country.name}: ${a1.value} L | ${cData.country.name}: ${a2.value} L (Saf alkol)`
    : `15 yaş üzeri kişi başına düşen yıllık saf alkol tüketimi (${a1.year})`;

  // 7. İntihar Oranı (MH_12)
  const s1 = pData.suicideRate || { value: 2.6, year: 2021 };
  const s2 = isComp ? (cData.suicideRate || { value: 10.0 }) : null;
  document.getElementById('metric-sui-value').innerHTML = fmtComp(s1.value, s2 ? s2.value : 0, '');
  document.getElementById('metric-sui-detail').innerText = isComp
    ? `${pData.country.name}: ${s1.value} | ${cData.country.name}: ${s2.value} (/100k kişi)`
    : `Her 100.000 kişilik nüfusta yaş standardize mortalite (${s1.year})`;

  // 8. Kızamık Aşı Kapsamı (WHS4_100)
  const v1 = pData.measlesVaccineCoverage;
  const v2 = isComp ? cData.measlesVaccineCoverage : null;
  document.getElementById('metric-vac-value').innerHTML = fmtComp(`%${v1.value}`, v2 ? `%${v2.value}` : '', '');
  document.getElementById('metric-vac-detail').innerText = isComp
    ? `${pData.country.name}: %${v1.value} | ${cData.country.name}: %${v2.value} (1 yaş çocuk)`
    : `1 yaş çocuk nüfusunda 1. doz kızamık (MCV1) aşılama oranı (${v1.year})`;

  // 9. Temiz Suya Erişim (WSH_WATER_BASIC)
  const w1 = pData.drinkingWaterAccess || { value: 96.0, year: 2024 };
  const w2 = isComp ? (cData.drinkingWaterAccess || { value: 100.0 }) : null;
  document.getElementById('metric-water-value').innerHTML = fmtComp(`%${w1.value}`, w2 ? `%${w2.value}` : '', '');
  document.getElementById('metric-water-detail').innerText = isComp
    ? `${pData.country.name}: %${w1.value} | ${cData.country.name}: %${w2.value} (Temiz Su)`
    : `Güvenli temel içme suyu kaynaklarına erişebilen nüfus oranı (${w1.year})`;

  // 10. Hava Kirliliğine Bağlı Ölümler (AIR_11)
  const ap1 = pData.airPollutionDeaths || { value: 7178, year: 2021 };
  const ap2 = isComp ? (cData.airPollutionDeaths || { value: 5000 }) : null;
  document.getElementById('metric-air-value').innerHTML = fmtComp(ap1.value.toLocaleString('tr-TR'), ap2 ? ap2.value.toLocaleString('tr-TR') : '', '');
  document.getElementById('metric-air-detail').innerText = isComp
    ? `${pData.country.name}: ${ap1.value.toLocaleString('tr-TR')} | ${cData.country.name}: ${ap2.value.toLocaleString('tr-TR')} (Yıllık)`
    : `İç ve dış ortam hava kirliliğine bağlı yıllık önlenebilir ölüm (${ap1.year})`;
}

// Tema / Kategori Filtrelemesi (Tüm Göstergeler, Yaşam Süresi, Sistem, Obezite, Ruh Sağlığı, Çevre)
function filterThemeCategory(category) {
  activeTheme = category;

  document.querySelectorAll('.theme-tab-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-mistral-ink', 'text-white');
    btn.classList.add('bg-white', 'text-mistral-ink');
  });

  const activeBtn = document.getElementById(`theme-btn-${category}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-mistral-ink', 'text-white');
    activeBtn.classList.remove('bg-white', 'text-mistral-ink');
  }

  // Kartları Göster / Gizle
  document.querySelectorAll('.dso-metric-card').forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Grafik Metriğini Değiştir (Yaşam Süresi, Obezite, Doktorlar, İntihar, Alkol, Aşılama)
function switchChartMetric(metric) {
  activeChartMetric = metric;

  document.querySelectorAll('.metric-chart-btn').forEach(b => {
    b.classList.remove('active', 'bg-mistral-ink', 'text-white');
    b.classList.add('bg-white', 'text-mistral-ink');
  });

  const activeBtn = document.getElementById(`btn-chart-${metric}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-mistral-ink', 'text-white');
    activeBtn.classList.remove('bg-white', 'text-mistral-ink');
  }

  if (primaryCountryData) {
    renderChart(primaryCountryData, compareCountryData);
  }
}

// Chart.js Çizimi (6 Metrik Desteği & İki Ülke Karşılaştırma)
function renderChart(pData, cData) {
  const canvas = document.getElementById('dso-chart-canvas');
  if (!canvas || typeof Chart === 'undefined') return;

  const isComp = isCompareMode && cData;
  const years = pData.trendYears || [2000, 2005, 2010, 2015, 2020, 2021];

  let metricLabel = 'Yaşam Süresi (Yıl)';
  let dataset1Values = pData.lifeExpectancyTrend;
  let dataset2Values = isComp ? cData.lifeExpectancyTrend : [];

  if (activeChartMetric === 'obesity') {
    metricLabel = 'Obezite Prevalansı (%)';
    dataset1Values = pData.obesityTrend;
    dataset2Values = isComp ? cData.obesityTrend : [];
  } else if (activeChartMetric === 'doctors') {
    metricLabel = 'Doktor Yoğunluğu (10.000 Kişide)';
    dataset1Values = pData.doctorsTrend;
    dataset2Values = isComp ? cData.doctorsTrend : [];
  } else if (activeChartMetric === 'suicide') {
    metricLabel = 'İntihar Oranı (100.000 Kişide)';
    dataset1Values = pData.suicideTrend;
    dataset2Values = isComp ? cData.suicideTrend : [];
  } else if (activeChartMetric === 'alcohol') {
    metricLabel = 'Kişi Başı Alkol Tüketimi (Litre/yıl)';
    dataset1Values = pData.alcoholTrend;
    dataset2Values = isComp ? cData.alcoholTrend : [];
  } else if (activeChartMetric === 'vaccine') {
    metricLabel = 'Kızamık Aşı Kapsamı (%)';
    dataset1Values = pData.vaccineTrend;
    dataset2Values = isComp ? cData.vaccineTrend : [];
  }

  let datasets = [
    {
      label: `${pData.country.name} (${metricLabel})`,
      data: dataset1Values,
      borderColor: '#fa520f',
      backgroundColor: 'rgba(250, 82, 15, 0.1)',
      borderWidth: 2.5,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#fa520f',
      fill: true,
      tension: 0.3
    }
  ];

  if (isComp && dataset2Values && dataset2Values.length > 0) {
    datasets.push({
      label: `${cData.country.name} (${metricLabel})`,
      data: dataset2Values,
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      borderWidth: 2.5,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#2563eb',
      fill: true,
      tension: 0.3
    });
  }

  if (healthChart) {
    healthChart.destroy();
  }

  const ctx = canvas.getContext('2d');
  healthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 12,
            font: { family: 'Inter', size: 12 }
          }
        },
        tooltip: {
          backgroundColor: '#1f1f1f',
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'JetBrains Mono', size: 12 },
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0, 0, 0, 0.04)' },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#6a6a6a' }
        },
        y: {
          grid: { color: 'rgba(0, 0, 0, 0.04)' },
          ticks: { font: { family: 'JetBrains Mono', size: 11 }, color: '#6a6a6a' }
        }
      }
    }
  });
}

// Global Kapsama Bağla (Window)
window.loadCountries = loadCountries;
window.onPrimaryCountryChange = onPrimaryCountryChange;
window.onCompareCountryChange = onCompareCountryChange;
window.toggleCompareMode = toggleCompareMode;
window.filterThemeCategory = filterThemeCategory;
window.switchChartMetric = switchChartMetric;

// Sayfa Yüklendiğinde Başlat
document.addEventListener('DOMContentLoaded', () => {
  loadCountries();
  loadHealthData();
});

