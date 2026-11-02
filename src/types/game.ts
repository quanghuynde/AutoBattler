export type CardType = 'attack' | 'support';
export type ComboTag = 'DOC_LAP' | 'DOAN_KET' | 'KHANG_CHIEN' | 'THONG_NHAT' | 'DOI_MOI' | 'PHAT_TRIEN';
export type CardCategory = 'nhan_vat' | 'su_kien' | 'to_chuc' | 'van_kien' | 'dau_moc';
export type Tier = 1 | 2 | 3 | 4 | 5;
export type Star = 1 | 2 | 3;

export type SkillEffect =
{kind: 'bonusDamage';percent: number;} |
{kind: 'strikeResistance';percent: number;resistance: number;} |
{kind: 'conditionalDamage';minResistance: number;percent: number;} |
{kind: 'resistance';amount: number;} |
{kind: 'armor';amount: number;} |
{kind: 'heal';amount: number;};

export interface Skill {
  name: string;
  description: string;
  cooldown: number;
  effect: SkillEffect;
}

/** Static card definition (data). */
export interface CardDefinition {
  id: string;
  name: string;
  category: CardCategory;
  type: CardType;
  tier: Tier;
  period: number;
  years: string;
  tags: ComboTag[];
  image: string;
  summary: string;
  history: string;
  skill: Skill;
  /** Passive team damage buff (fraction) for support cards. */
  supportBuff?: number;
  sources: string[];
}

/** An owned copy of a card. */
export interface CardInstance {
  uid: string;
  cardId: string;
  star: Star;
}

/** A resolved card: definition + owned instance values. */
export interface Card extends CardDefinition {
  uid: string;
  star: Star;
  buyPrice: number;
  sellPrice: number;
}

export type Zone = 'formation' | 'storage';
export interface CardLocation {
  zone: Zone;
  index: number;
}

export interface Enemy {
  name: string;
  description: string;
  resist: number;
  image: string;
  kind: 'military' | 'challenge';
}

export interface StageHistory {
  title: string;
  timeline: {time: string;text: string;}[];
  summary: string;
  related: string[];
  sources: string[];
}

export interface Stage {
  id: number;
  name: string;
  period: string;
  description: string;
  target: number;
  enemy: Enemy;
  history: StageHistory;
}

export interface ShopItem {
  id: string;
  cardId: string;
  star: Star;
  sold: boolean;
}

export type ComboEffect =
{kind: 'startResistance';amount: number;} |
{kind: 'startArmor';amount: number;} |
{kind: 'turnDamage';turn: number;percent: number;} |
{kind: 'fromTurnDamage';fromTurn: number;percent: number;} |
{kind: 'conditionalAttack';minResistance: number;percent: number;};

export interface Combo {
  id: string;
  name: string;
  cardIds: string[];
  description: string;
  effect: ComboEffect;
}

export interface TagComboTier {
  count: number;
  damage: number;
  resistancePerTurn: number;
}

export type CombatEvent =
{type: 'combo';text: string;} |
{type: 'support';slot: number;skill: string;text: string;armorAfter: number;willAfter: number;} |
{type: 'resistance';amount: number;total: number;} |
{type: 'attack';slot: number;damage: number;skill?: string;} |
{type: 'counter';damage: number;blocked: number;willAfter: number;armorAfter: number;} |
{type: 'milestone';index: number;};

export interface CombatState {
  turn: number;
  totalDamage: number;
  resistance: number;
  armor: number;
  will: number;
  milestones: boolean[];
  passed: boolean;
  finished: boolean;
  skillActivations: number;
  triggeredCombos: string[];
}

export interface BattleResult {
  stage: number;
  passed: boolean;
  totalDamage: number;
  milestones: boolean[];
  coinsEarned: number;
  skillActivations: number;
  combos: string[];
  unlockedSlot: number | null;
  endedByWill: boolean;
}

export interface Player {
  coins: number;
  will: number;
  stage: number;
  unlockedSlots: number;
  formation: (CardInstance | null)[];
  storage: (CardInstance | null)[];
}

export type Phase = 'starter' | 'prep' | 'battle' | 'result' | 'shop' | 'victory';

export interface GameState {
  active: boolean;
  phase: Phase;
  player: Player;
  starterChoices: CardInstance[];
  combat: CombatState | null;
  lastResult: BattleResult | null;
  shop: ShopItem[];
  shopStage: number;
  claimedMilestones: Record<number, boolean[]>;
  quizAnswered: Record<number, boolean>;
  clearedStages: number[];
}

export interface Settings {
  sound: boolean;
  effects: boolean;
}