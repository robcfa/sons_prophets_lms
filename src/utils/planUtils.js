// Plan utilities for tiered access control
export const PLAN_TIERS = {
  FREE: 'free',
  PLUS: 'plus',
  PREMIUM: 'premium'
};

export const PLAN_RANKS = {
  [PLAN_TIERS.FREE]: 1,
  [PLAN_TIERS.PLUS]: 2,
  [PLAN_TIERS.PREMIUM]: 3
};

export const planRank = (plan) => {
  if (!plan || typeof plan !== 'string') return 0;
  return PLAN_RANKS[plan.toLowerCase()] || 0;
};

export const hasAccess = (userPlan, requiredPlans) => {
  if (!requiredPlans || requiredPlans.length === 0) return true;
  if (!userPlan) return false;
  
  const userRank = planRank(userPlan);
  return requiredPlans.some(plan => userRank >= planRank(plan));
};

export const getUserPlan = (user) => {
  return user?.userProfile?.plan || user?.plan || PLAN_TIERS.FREE;
};

export const isFreePlan = (plan) => planRank(plan) === 1;
export const isPlusPlan = (plan) => planRank(plan) >= 2;
export const isPremiumPlan = (plan) => planRank(plan) >= 3;