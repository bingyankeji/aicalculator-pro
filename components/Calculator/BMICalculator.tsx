'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface BMIInputs {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
}

type BMICategory = 
  | 'severe-thinness' 
  | 'moderate-thinness' 
  | 'mild-thinness' 
  | 'normal' 
  | 'overweight' 
  | 'obese-class-1' 
  | 'obese-class-2' 
  | 'obese-class-3';

interface BMIResult {
  bmi: number;
  bmiPrime: number;
  ponderalIndex: number;
  category: BMICategory;
  categoryLabel: string;
  categoryDescription: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  weightToChange: number;
  analysis: {
    rating: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
    risks: string[];
    recommendations: string[];
    targetCalories: number;
    exerciseMinutes: number;
    timeToGoal: string;
    peerComparison: string;
  };
}

export function BMICalculator() {
  const [inputs, setInputs] = useState<BMIInputs>({
    weight: 70,
    height: 170,
    age: 30,
    gender: 'male',
    unit: 'metric',
  });

  const [result, setResult] = useState<BMIResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Load data from URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const w = params.get('w'); // weight
    const h = params.get('h'); // height
    const a = params.get('a'); // age
    const g = params.get('g'); // gender (m/f)
    const u = params.get('u'); // unit (metric/imperial)

    if (w && h && a && g) {
      const newInputs: BMIInputs = {
        weight: parseFloat(w),
        height: parseFloat(h),
        age: parseInt(a),
        gender: g === 'f' ? 'female' : 'male',
        unit: u === 'imperial' ? 'imperial' : 'metric',
      };
      setInputs(newInputs);
      
      // Auto-calculate after a short delay
      setTimeout(() => {
        const calculatedResult = calculateBMIFromInputs(newInputs);
        setResult(calculatedResult);
      }, 100);
    }
  }, []);

  const calculateBMIFromInputs = (inputData: BMIInputs): BMIResult => {
    // Same calculation logic, but accepts inputs as parameter
    let bmi: number;
    let heightInMeters: number;
    let weightInKg: number;
    let heightInInches: number;
    let weightInLbs: number;

    if (inputData.unit === 'metric') {
      heightInMeters = inputData.height / 100;
      weightInKg = inputData.weight;
      heightInInches = inputData.height * 0.393701;
      weightInLbs = inputData.weight * 2.20462;
      bmi = inputData.weight / (heightInMeters * heightInMeters);
    } else {
      weightInKg = inputData.weight * 0.453592;
      heightInMeters = inputData.height * 0.0254;
      heightInInches = inputData.height;
      weightInLbs = inputData.weight;
      bmi = (inputData.weight * 703) / (inputData.height * inputData.height);
    }

    const bmiPrime = bmi / 25;
    let ponderalIndex: number;
    if (inputData.unit === 'metric') {
      ponderalIndex = weightInKg / Math.pow(heightInMeters, 3);
    } else {
      ponderalIndex = heightInInches / Math.pow(weightInLbs, 1/3);
    }

    let category: BMICategory;
    let categoryLabel: string;
    let categoryDescription: string;
    
    if (bmi < 16) {
      category = 'severe-thinness';
      categoryLabel = 'Severe Thinness';
      categoryDescription = 'BMI < 16';
    } else if (bmi < 17) {
      category = 'moderate-thinness';
      categoryLabel = 'Moderate Thinness';
      categoryDescription = 'BMI 16 - 17';
    } else if (bmi < 18.5) {
      category = 'mild-thinness';
      categoryLabel = 'Mild Thinness';
      categoryDescription = 'BMI 17 - 18.5';
    } else if (bmi < 25) {
      category = 'normal';
      categoryLabel = 'Normal Weight';
      categoryDescription = 'BMI 18.5 - 25';
    } else if (bmi < 30) {
      category = 'overweight';
      categoryLabel = 'Overweight';
      categoryDescription = 'BMI 25 - 30';
    } else if (bmi < 35) {
      category = 'obese-class-1';
      categoryLabel = 'Obese Class I';
      categoryDescription = 'BMI 30 - 35';
    } else if (bmi < 40) {
      category = 'obese-class-2';
      categoryLabel = 'Obese Class II';
      categoryDescription = 'BMI 35 - 40';
    } else {
      category = 'obese-class-3';
      categoryLabel = 'Obese Class III';
      categoryDescription = 'BMI ≥ 40';
    }

    const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);

    const healthyWeightRange = {
      min: inputData.unit === 'metric' ? minHealthyWeight : minHealthyWeight * 2.20462,
      max: inputData.unit === 'metric' ? maxHealthyWeight : maxHealthyWeight * 2.20462,
    };

    let weightToChange = 0;
    if (weightInKg < minHealthyWeight) {
      weightToChange = minHealthyWeight - weightInKg;
      if (inputData.unit === 'imperial') weightToChange *= 2.20462;
    } else if (weightInKg > maxHealthyWeight) {
      weightToChange = weightInKg - maxHealthyWeight;
      if (inputData.unit === 'imperial') weightToChange *= 2.20462;
    }

    const analysis = generateAnalysis(
      bmi,
      category,
      weightToChange,
      inputData.unit,
      inputData.age,
      inputData.gender,
      weightInKg,
      heightInMeters
    );

    return {
      bmi: Math.round(bmi * 10) / 10,
      bmiPrime: Math.round(bmiPrime * 100) / 100,
      ponderalIndex: Math.round(ponderalIndex * 10) / 10,
      category,
      categoryLabel,
      categoryDescription,
      healthyWeightRange,
      weightToChange,
      analysis,
    };
  };

  const calculateBMI = (): BMIResult => {
    let bmi: number;
    let heightInMeters: number;
    let weightInKg: number;
    let heightInInches: number;
    let weightInLbs: number;

    if (inputs.unit === 'metric') {
      heightInMeters = inputs.height / 100;
      weightInKg = inputs.weight;
      heightInInches = inputs.height * 0.393701;
      weightInLbs = inputs.weight * 2.20462;
      bmi = inputs.weight / (heightInMeters * heightInMeters);
    } else {
      weightInKg = inputs.weight * 0.453592;
      heightInMeters = inputs.height * 0.0254;
      heightInInches = inputs.height;
      weightInLbs = inputs.weight;
      bmi = (inputs.weight * 703) / (inputs.height * inputs.height);
    }

    // Calculate BMI Prime (BMI / 25)
    const bmiPrime = bmi / 25;

    // Calculate Ponderal Index
    let ponderalIndex: number;
    if (inputs.unit === 'metric') {
      // PI = mass (kg) / height³ (m)
      ponderalIndex = weightInKg / Math.pow(heightInMeters, 3);
    } else {
      // PI = height (in) / ∛mass (lbs)
      ponderalIndex = heightInInches / Math.pow(weightInLbs, 1/3);
    }

    // Determine category (8 WHO classifications)
    let category: BMICategory;
    let categoryLabel: string;
    let categoryDescription: string;
    
    if (bmi < 16) {
      category = 'severe-thinness';
      categoryLabel = 'Severe Thinness';
      categoryDescription = 'BMI < 16';
    } else if (bmi < 17) {
      category = 'moderate-thinness';
      categoryLabel = 'Moderate Thinness';
      categoryDescription = 'BMI 16 - 17';
    } else if (bmi < 18.5) {
      category = 'mild-thinness';
      categoryLabel = 'Mild Thinness';
      categoryDescription = 'BMI 17 - 18.5';
    } else if (bmi < 25) {
      category = 'normal';
      categoryLabel = 'Normal Weight';
      categoryDescription = 'BMI 18.5 - 25';
    } else if (bmi < 30) {
      category = 'overweight';
      categoryLabel = 'Overweight';
      categoryDescription = 'BMI 25 - 30';
    } else if (bmi < 35) {
      category = 'obese-class-1';
      categoryLabel = 'Obese Class I';
      categoryDescription = 'BMI 30 - 35';
    } else if (bmi < 40) {
      category = 'obese-class-2';
      categoryLabel = 'Obese Class II';
      categoryDescription = 'BMI 35 - 40';
    } else {
      category = 'obese-class-3';
      categoryLabel = 'Obese Class III';
      categoryDescription = 'BMI ≥ 40';
    }

    // Calculate healthy weight range (BMI 18.5 - 24.9)
    const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);

    const healthyWeightRange = {
      min: inputs.unit === 'metric' ? minHealthyWeight : minHealthyWeight * 2.20462,
      max: inputs.unit === 'metric' ? maxHealthyWeight : maxHealthyWeight * 2.20462,
    };

    // Calculate weight to change
    let weightToChange = 0;
    if (weightInKg < minHealthyWeight) {
      weightToChange = minHealthyWeight - weightInKg;
      if (inputs.unit === 'imperial') weightToChange *= 2.20462;
    } else if (weightInKg > maxHealthyWeight) {
      weightToChange = weightInKg - maxHealthyWeight;
      if (inputs.unit === 'imperial') weightToChange *= 2.20462;
    }

    // Generate enhanced analysis
    const analysis = generateAnalysis(
      bmi,
      category,
      weightToChange,
      inputs.unit,
      inputs.age,
      inputs.gender,
      weightInKg,
      heightInMeters
    );

    return {
      bmi: Math.round(bmi * 10) / 10,
      bmiPrime: Math.round(bmiPrime * 100) / 100,
      ponderalIndex: Math.round(ponderalIndex * 10) / 10,
      category,
      categoryLabel,
      categoryDescription,
      healthyWeightRange,
      weightToChange,
      analysis,
    };
  };

  const generateAnalysis = (
    bmi: number,
    category: BMICategory,
    weightToChange: number,
    unit: string,
    age: number,
    gender: string,
    weightInKg: number,
    heightInMeters: number
  ) => {
    let rating: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
    let risks: string[] = [];
    let recommendations: string[] = [];

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * (heightInMeters * 100) - 5 * age + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * (heightInMeters * 100) - 5 * age - 161;
    }

    const tdee = Math.round(bmr * 1.55);

    let targetCalories: number;
    let exerciseMinutes: number;
    let timeToGoal: string;

    // Enhanced rating and recommendations based on 8 categories
    if (category === 'severe-thinness' || category === 'moderate-thinness') {
      rating = 'critical';
      targetCalories = tdee + 500;
      exerciseMinutes = 150;
      const weeksToGoal = Math.ceil((weightToChange / 0.5) * 1.5);
      timeToGoal = weeksToGoal > 52 ? `${Math.ceil(weeksToGoal / 4)} months` : `${weeksToGoal} weeks`;

      risks.push('Severe malnutrition and critical nutrient deficiencies');
      risks.push('Severely weakened immune system, high infection risk');
      risks.push('Severe osteoporosis and high fracture risk');
      risks.push('Organ damage and failure risk');
      if (gender === 'female') risks.push('Amenorrhea and severe fertility problems');
      if (age > 60) risks.push('Critical frailty and high mortality risk');

      recommendations.push(`⚠️ URGENT: Consult doctor immediately for medical evaluation`);
      recommendations.push(`Increase daily intake to ${targetCalories} calories (+${targetCalories - tdee} surplus)`);
      recommendations.push('Work with registered dietitian for meal planning');
      recommendations.push('Focus on calorie-dense, nutritious foods every 2-3 hours');
      recommendations.push('Avoid excessive exercise until weight improves');
      recommendations.push(`Goal: Gain ${weightToChange.toFixed(1)} ${unit === 'metric' ? 'kg' : 'lbs'} over ${timeToGoal}`);
      
    } else if (category === 'mild-thinness') {
      rating = 'poor';
      targetCalories = tdee + 500;
      exerciseMinutes = 150;
      const weeksToGoal = Math.ceil((weightToChange / 0.5) * 1.5);
      timeToGoal = weeksToGoal > 52 ? `${Math.ceil(weeksToGoal / 4)} months` : `${weeksToGoal} weeks`;

      risks.push('Malnutrition and nutrient deficiencies');
      risks.push('Weakened immune system');
      risks.push('Osteoporosis risk');
      if (gender === 'female') risks.push('Irregular menstruation and fertility issues');

      recommendations.push(`Increase daily calories to ${targetCalories} (${targetCalories - tdee}+ surplus)`);
      recommendations.push('Eat 5-6 smaller, nutrient-dense meals daily');
      recommendations.push('Include healthy fats: nuts, avocados, olive oil');
      recommendations.push(`Strength training ${exerciseMinutes} min/week to build muscle`);
      recommendations.push('Consult healthcare provider or dietitian');
      recommendations.push(`Goal: Gain ${weightToChange.toFixed(1)} ${unit === 'metric' ? 'kg' : 'lbs'} over ${timeToGoal}`);

    } else if (category === 'normal') {
      if (bmi >= 20 && bmi <= 23) {
        rating = 'excellent';
      } else {
        rating = 'good';
      }
      targetCalories = tdee;
      exerciseMinutes = 150;
      timeToGoal = 'Maintain current weight';

      recommendations.push(`Maintain weight with ${targetCalories} calories daily`);
      recommendations.push(`Continue ${exerciseMinutes}+ minutes/week of physical activity`);
      recommendations.push('Balanced diet: 45-65% carbs, 20-35% fat, 10-35% protein');
      recommendations.push('Stay hydrated: 8-10 glasses of water daily');
      recommendations.push('Get 7-9 hours of quality sleep nightly');
      recommendations.push('Monitor weight monthly');
      if (age > 40) recommendations.push('Include strength training 2-3x/week for muscle maintenance');

    } else if (category === 'overweight') {
      rating = 'fair';
      targetCalories = tdee - 500;
      exerciseMinutes = 200;
      const weeksToGoal = Math.ceil(weightToChange / 0.5);
      timeToGoal = weeksToGoal > 52 ? `${Math.ceil(weeksToGoal / 4)} months` : `${weeksToGoal} weeks`;

      risks.push('Increased risk of type 2 diabetes (20-40% higher)');
      risks.push('High blood pressure and cardiovascular disease risk');
      risks.push('Elevated LDL cholesterol and triglycerides');
      risks.push('Joint problems and osteoarthritis');
      if (age > 50) risks.push('Increased cancer risk');

      recommendations.push(`Reduce daily intake to ${targetCalories} calories (${tdee - targetCalories} deficit)`);
      recommendations.push(`Target: Lose ${weightToChange.toFixed(1)} ${unit === 'metric' ? 'kg' : 'lbs'} over ${timeToGoal} (0.5-1 ${unit === 'metric' ? 'kg' : 'lbs'}/week)`);
      recommendations.push(`Exercise ${exerciseMinutes}+ min/week: cardio + strength training`);
      recommendations.push('Eliminate sugary drinks, reduce processed foods');
      recommendations.push('Practice portion control, keep food diary');
      recommendations.push('Aim for 10,000 steps daily');

    } else if (category === 'obese-class-1') {
      rating = 'poor';
      targetCalories = tdee - 750;
      exerciseMinutes = 250;
      const weeksToGoal = Math.ceil(weightToChange / 0.75);
      timeToGoal = weeksToGoal > 52 ? `${Math.ceil(weeksToGoal / 4)} months` : `${weeksToGoal} weeks`;

      risks.push('High risk of type 2 diabetes and insulin resistance');
      risks.push('Heart disease and high blood pressure');
      risks.push('Sleep apnea and breathing difficulties');
      risks.push('Fatty liver disease');
      risks.push('Joint damage and limited mobility');
      if (gender === 'female') risks.push('PCOS and fertility problems');

      recommendations.push(`Medical supervision: ${targetCalories} cal/day (${tdee - targetCalories} deficit)`);
      recommendations.push(`Goal: Lose ${weightToChange.toFixed(1)} ${unit === 'metric' ? 'kg' : 'lbs'} over ${timeToGoal} (0.5-1 ${unit === 'metric' ? 'kg' : 'lbs'}/week)`);
      recommendations.push(`Start with ${exerciseMinutes} min/week low-impact exercise (walking, swimming)`);
      recommendations.push('Consult doctor about weight loss medications if needed');
      recommendations.push('Join weight management program or support group');
      recommendations.push('Monitor blood pressure, glucose, cholesterol quarterly');

    } else if (category === 'obese-class-2') {
      rating = 'critical';
      targetCalories = tdee - 750;
      exerciseMinutes = 300;
      const weeksToGoal = Math.ceil(weightToChange / 0.75);
      timeToGoal = weeksToGoal > 52 ? `${Math.ceil(weeksToGoal / 4)} months` : `${weeksToGoal} weeks`;

      risks.push('Very high risk of heart attack and stroke');
      risks.push('Severe type 2 diabetes complications');
      risks.push('Severe sleep apnea, may require CPAP');
      risks.push('Liver cirrhosis risk');
      risks.push('Multiple cancers (breast, colon, kidney, liver)');
      risks.push('Severe mobility limitations and disability');

      recommendations.push(`⚠️ Medical supervision required: ${targetCalories} cal/day plan`);
      recommendations.push(`Goal: Lose ${weightToChange.toFixed(1)} ${unit === 'metric' ? 'kg' : 'lbs'} over ${timeToGoal}`);
      recommendations.push('Discuss prescription weight loss medications with doctor');
      recommendations.push('Consider medically supervised very-low-calorie diet (VLCD)');
      recommendations.push(`Gradual exercise increase to ${exerciseMinutes} min/week`);
      recommendations.push('Evaluate eligibility for bariatric surgery');
      recommendations.push('Monthly medical monitoring of all health markers');

    } else { // obese-class-3
      rating = 'critical';
      targetCalories = tdee - 750;
      exerciseMinutes = 300;
      const weeksToGoal = Math.ceil(weightToChange / 1);
      timeToGoal = weeksToGoal > 52 ? `${Math.ceil(weeksToGoal / 4)} months` : `${weeksToGoal} weeks`;

      risks.push('⚠️ Critical: Life-threatening health risks');
      risks.push('Extreme risk of premature death (200-300% increased)');
      risks.push('Severe cardiovascular disease');
      risks.push('Severe diabetes with complications');
      risks.push('Respiratory failure risk');
      risks.push('Multiple organ system failures');
      risks.push('Severe mobility impairment');

      recommendations.push(`🚨 URGENT: Immediate medical intervention required`);
      recommendations.push(`Comprehensive medical weight loss program: ${targetCalories} cal/day`);
      recommendations.push('Bariatric surgery consultation strongly recommended (gastric bypass, sleeve)');
      recommendations.push('Prescription medications: GLP-1 agonists, others as prescribed');
      recommendations.push('Medically supervised VLCD (800-1200 cal/day)');
      recommendations.push(`Physical therapy-guided exercise program (target ${exerciseMinutes} min/week)`);
      recommendations.push('Weekly medical monitoring, behavioral therapy');
      recommendations.push(`Goal: Lose ${weightToChange.toFixed(1)} ${unit === 'metric' ? 'kg' : 'lbs'} over ${timeToGoal}`);
    }

    // Peer comparison
    let avgBMI: number;
    if (gender === 'male') {
      if (age < 30) avgBMI = 24.5;
      else if (age < 40) avgBMI = 26.0;
      else if (age < 50) avgBMI = 27.2;
      else if (age < 60) avgBMI = 28.0;
      else avgBMI = 27.5;
    } else {
      if (age < 30) avgBMI = 23.5;
      else if (age < 40) avgBMI = 25.2;
      else if (age < 50) avgBMI = 26.8;
      else if (age < 60) avgBMI = 27.8;
      else avgBMI = 27.3;
    }

    const bmiDiff = bmi - avgBMI;
    let peerComparison: string;
    if (Math.abs(bmiDiff) < 1) {
      peerComparison = `Your BMI is close to the average for ${gender}s aged ${age} (${avgBMI.toFixed(1)})`;
    } else if (bmiDiff < 0) {
      peerComparison = `Your BMI is ${Math.abs(bmiDiff).toFixed(1)} points below average for ${gender}s aged ${age} (${avgBMI.toFixed(1)})`;
    } else {
      peerComparison = `Your BMI is ${bmiDiff.toFixed(1)} points above average for ${gender}s aged ${age} (${avgBMI.toFixed(1)})`;
    }

    const ageNote = age >= 65 
      ? ' Note: For older adults, slightly higher BMI (23-27) may be protective against health risks.'
      : age >= 50
      ? ' Note: As we age, maintaining muscle mass becomes increasingly important alongside BMI management.'
      : '';

    const genderNote = gender === 'female'
      ? ' Women naturally have 6-11% more body fat than men at the same BMI.'
      : ' Men typically have higher muscle mass, which BMI doesn\'t account for.';

    peerComparison += genderNote + ageNote;

    return {
      rating,
      risks,
      recommendations,
      targetCalories,
      exerciseMinutes,
      timeToGoal,
      peerComparison,
    };
  };

  const handleCalculate = () => {
    if (inputs.weight <= 0 || inputs.height <= 0 || inputs.age <= 0) {
      alert('Please enter valid weight, height, and age values.');
      return;
    }
    if (inputs.age < 18) {
      alert('This calculator is designed for adults (18+). For children and teens, please use BMI-for-age percentile charts.');
      return;
    }
    if (inputs.age > 120) {
      alert('Please enter a valid age.');
      return;
    }
    const result = calculateBMI();
    setResult(result);
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    // Get base URL (use environment variable if available, otherwise use current origin)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    
    // Build URL with parameters (shortened)
    const params = new URLSearchParams({
      w: inputs.weight.toString(), // weight
      h: inputs.height.toString(), // height
      a: inputs.age.toString(), // age
      g: inputs.gender === 'female' ? 'f' : 'm', // gender
      u: inputs.unit === 'imperial' ? 'imperial' : 'metric', // unit
    });
    
    const url = `${baseUrl}/bmi-calculator?${params.toString()}`;
    setShareUrl(url);
    setShowShareModal(true);
    setCopySuccess(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy link. Please copy manually.');
    }
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'email') => {
    const text = `Check out my BMI calculation: BMI ${result?.bmi}, ${result?.categoryLabel}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('My BMI Calculation')}&body=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    if (newUnit === inputs.unit) return;

    let newWeight = inputs.weight;
    let newHeight = inputs.height;

    if (newUnit === 'imperial') {
      newWeight = inputs.weight * 2.20462;
      newHeight = inputs.height * 0.393701;
    } else {
      newWeight = inputs.weight * 0.453592;
      newHeight = inputs.height * 2.54;
    }

    setInputs({
      ...inputs,
      weight: Math.round(newWeight * 10) / 10,
      height: Math.round(newHeight * 10) / 10,
      unit: newUnit,
    });
  };

  const getCategoryColor = (category: BMICategory) => {
    switch (category) {
      case 'severe-thinness':
        return { gradient: 'from-indigo-600 to-blue-700', hex: '#4F46E5' };
      case 'moderate-thinness':
        return { gradient: 'from-blue-500 to-blue-600', hex: '#3B82F6' };
      case 'mild-thinness':
        return { gradient: 'from-blue-400 to-cyan-500', hex: '#60A5FA' };
      case 'normal':
        return { gradient: 'from-green-500 to-green-600', hex: '#10B981' };
      case 'overweight':
        return { gradient: 'from-yellow-500 to-orange-500', hex: '#F59E0B' };
      case 'obese-class-1':
        return { gradient: 'from-orange-500 to-red-500', hex: '#F97316' };
      case 'obese-class-2':
        return { gradient: 'from-red-500 to-red-600', hex: '#EF4444' };
      case 'obese-class-3':
        return { gradient: 'from-red-600 to-red-700', hex: '#DC2626' };
      default:
        return { gradient: 'from-gray-500 to-gray-600', hex: '#6B7280' };
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-orange-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      // Wait for all content to render
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `bmi-calculation-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      // Wait for all content to render
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const imageUrl = canvas.toDataURL('image/png', 1.0);
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>BMI Calculation Report</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background: #ffffff; }
                img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
                @media print { body { margin: 0; padding: 0; } img { max-width: 100%; page-break-inside: avoid; } }
              </style>
            </head>
            <body><img src="${imageUrl}" alt="BMI Calculation Report" /></body>
          </html>
        `);
        printWindow.document.close();
        
        const img = printWindow.document.querySelector('img');
        if (img) {
          img.onload = () => {
            setTimeout(() => printWindow.print(), 250);
          };
        }
      }
    } catch (error) {
      console.error('Error printing:', error);
      alert('Failed to print. Please try again.');
    }
  };

  // Gauge chart data
  const getGaugeData = (bmi: number) => {
    const gaugeValue = Math.min(Math.max(bmi, 15), 45);
    const percentage = ((gaugeValue - 15) / 30) * 100;
    
    return [
      { name: 'BMI', value: percentage, color: getCategoryColor(result?.category || 'normal').hex },
      { name: 'Rest', value: 100 - percentage, color: '#E5E7EB' }
    ];
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 lg:items-start">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">BMI Calculator</h2>

            {/* Unit Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => handleUnitChange('metric')}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    inputs.unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Metric (kg, cm)
                </button>
                <button
                  onClick={() => handleUnitChange('imperial')}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    inputs.unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Imperial (lbs, in)
                </button>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setInputs({ ...inputs, gender: 'male' })}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    inputs.gender === 'male' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setInputs({ ...inputs, gender: 'female' })}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    inputs.gender === 'female' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Age Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
              <input
                type="number"
                value={inputs.age}
                onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="e.g., 30"
                min="18"
                max="120"
              />
              <p className="text-xs text-gray-500 mt-1">Must be 18 or older</p>
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight {inputs.unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <input
                type="number"
                value={inputs.weight}
                onChange={(e) => setInputs({ ...inputs, weight: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder={inputs.unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
              />
            </div>

            {/* Height Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height {inputs.unit === 'metric' ? '(cm)' : '(inches)'}
              </label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder={inputs.unit === 'metric' ? 'e.g., 170' : 'e.g., 67'}
              />
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Calculate BMI
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-4">
              {/* Export & Share Buttons */}
              <div className="flex gap-3 justify-end mb-4 flex-wrap">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <button
                  onClick={handleSaveAsImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Save as Image
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
              </div>

              {/* Result Content */}
              <div ref={resultRef} className="space-y-4 bg-white p-8 rounded-xl shadow-lg" style={{ width: '900px' }}>
                {/* Export Header */}
                <div className="border-b-2 border-gray-200 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">BMI Calculation Report</h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {inputs.gender === 'male' ? 'Male' : 'Female'}, Age {inputs.age}
                  </p>
                </div>

                {/* BMI Result Card with Gauge */}
                <div className={`bg-gradient-to-br ${getCategoryColor(result.category).gradient} rounded-xl shadow-xl p-6 text-white`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ flex: 1 }}>
                      <div className="text-sm font-medium opacity-90 mb-2">Your BMI is</div>
                      <div className="text-5xl font-bold mb-2">{result.bmi}</div>
                      <div className="text-xl font-semibold mb-1">{result.categoryLabel}</div>
                      <div className="text-sm opacity-90">{result.categoryDescription}</div>
                    </div>
                    <div style={{ width: '160px', height: '160px', flexShrink: 0 }}>
                      <ResponsiveContainer width={160} height={160}>
                        <PieChart>
                          <Pie
                            data={getGaugeData(result.bmi)}
                            cx={80}
                            cy={80}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                          >
                            {getGaugeData(result.bmi).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* BMI Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* BMI Prime */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📊</span>
                      <h4 className="font-bold text-gray-900">BMI Prime</h4>
                    </div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">{result.bmiPrime}</div>
                    <p className="text-sm text-gray-600">
                      {result.bmiPrime < 0.74 ? 'Below optimal' : 
                       result.bmiPrime <= 1 ? 'Optimal range' : 
                       result.bmiPrime <= 1.2 ? 'Above optimal' : 'Significantly above optimal'}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      BMI Prime = BMI ÷ 25 (optimal: 0.74-1.0)
                    </p>
                  </div>

                  {/* Ponderal Index */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📐</span>
                      <h4 className="font-bold text-gray-900">Ponderal Index</h4>
                    </div>
                    <div className="text-3xl font-bold text-cyan-600 mb-1">{result.ponderalIndex}</div>
                    <p className="text-sm text-gray-600">
                      More accurate for extreme heights
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {inputs.unit === 'metric' ? 'PI = mass(kg) ÷ height³(m)' : 'PI = height(in) ÷ ∛mass(lbs)'}
                    </p>
                  </div>
                </div>

                {/* BMI Range Visualization */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">BMI Range (WHO Classification)</h3>
                  <div className="relative">
                    {/* Multi-color gradient bar */}
                    <div className="h-8 flex rounded-full overflow-hidden shadow-inner">
                      <div className="bg-indigo-600 flex-1" title="Severe Thinness"></div>
                      <div className="bg-blue-500 flex-1" title="Moderate Thinness"></div>
                      <div className="bg-blue-400 flex-1" title="Mild Thinness"></div>
                      <div className="bg-green-500 flex-[1.5]" title="Normal"></div>
                      <div className="bg-yellow-500 flex-1" title="Overweight"></div>
                      <div className="bg-orange-500 flex-1" title="Obese I"></div>
                      <div className="bg-red-500 flex-1" title="Obese II"></div>
                      <div className="bg-red-600 flex-1" title="Obese III"></div>
                    </div>
                    {/* Marker */}
                    <div
                      className="absolute top-0 h-8 w-1 bg-white shadow-lg"
                      style={{ left: `${Math.min(Math.max((result.bmi - 15) / 30 * 100, 0), 100)}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {result.bmi}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <span>15</span>
                    <span>16</span>
                    <span>17</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>35</span>
                    <span>40</span>
                    <span>45+</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap justify-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-indigo-600 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 whitespace-nowrap">Severe (&lt;16)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 whitespace-nowrap">Moderate (16-17)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 whitespace-nowrap">Mild (17-18.5)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-semibold whitespace-nowrap">Normal (18.5-25)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-xs mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 whitespace-nowrap">Overweight (25-30)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 whitespace-nowrap">Obese I (30-35)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 whitespace-nowrap">Obese II (35-40)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 whitespace-nowrap">Obese III (≥40)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Peer Comparison */}
                <div className="bg-purple-50 rounded-xl border border-purple-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>👥</span>
                    Comparison with Peers
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {result.analysis.peerComparison}
                  </p>
                </div>

                {/* Healthy Weight Range */}
                <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Healthy Weight Range</h3>
                  <p className="text-gray-700 mb-2">For your height, a healthy weight range is:</p>
                  <div className="text-2xl font-bold text-green-600">
                    {result.healthyWeightRange.min.toFixed(1)} - {result.healthyWeightRange.max.toFixed(1)} {inputs.unit === 'metric' ? 'kg' : 'lbs'}
                  </div>
                  {result.weightToChange > 0 && (
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Goal:</strong> {result.category.includes('thinness') ? 'Gain' : 'Lose'} approximately{' '}
                        <strong className="text-gray-900">{result.weightToChange.toFixed(1)} {inputs.unit === 'metric' ? 'kg' : 'lbs'}</strong>
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Timeline:</strong> {result.analysis.timeToGoal}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Plan */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🎯</span>
                    Your Action Plan
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Target Daily Calories</div>
                      <div className="text-2xl font-bold text-blue-600">{result.analysis.targetCalories} cal</div>
                      <p className="text-xs text-gray-600 mt-1">
                        {result.category.includes('thinness') && 'Caloric surplus for healthy weight gain'}
                        {result.category === 'normal' && 'Maintenance calories to stay healthy'}
                        {(result.category === 'overweight' || result.category.includes('obese')) && 'Caloric deficit for gradual weight loss'}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Exercise Goal</div>
                      <div className="text-2xl font-bold text-purple-600">{result.analysis.exerciseMinutes} min/week</div>
                      <p className="text-xs text-gray-600 mt-1">Moderate aerobic activity + strength training</p>
                    </div>
                  </div>
                </div>

                {/* Health Analysis */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">📊</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Health Analysis</h3>
                      <p className={`text-sm font-semibold ${getRatingColor(result.analysis.rating)}`}>
                        Rating: {result.analysis.rating.charAt(0).toUpperCase() + result.analysis.rating.slice(1)}
                      </p>
                    </div>
                  </div>

                  {/* Health Risks */}
                  {result.analysis.risks.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-red-500">⚠️</span>
                        Potential Health Risks
                      </h4>
                      <ul className="space-y-2">
                        {result.analysis.risks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-red-500 mt-0.5">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-blue-500">💡</span>
                      Personalized Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {result.analysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-500 mt-0.5">✓</span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                  <p className="text-xs text-gray-700">
                    <strong>⚠️ Disclaimer:</strong> This BMI calculator is for informational purposes only and should not replace professional medical advice. BMI is a screening tool and doesn't diagnose health conditions. Consult with a healthcare provider for personalized health assessments, especially before starting any weight loss or gain program.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-5xl mb-4">⚖️</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate</div>
              <p className="text-gray-600">
                Enter your details on the left and click "Calculate BMI" to see your personalized health analysis
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Share Your Results</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4 text-sm">
              Share your BMI calculation with friends and family. They'll see your inputs and can calculate their own BMI.
            </p>

            {/* Copy Link */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Share Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copySuccess
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copySuccess ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-600 text-xs mt-2 font-medium">✓ Link copied to clipboard!</p>
              )}
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Share via</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
                
                <button
                  onClick={() => handleSocialShare('email')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong className="text-blue-600">💡 Tip:</strong> The link will auto-fill your friend's calculator with your data. They can then adjust and calculate their own BMI.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
