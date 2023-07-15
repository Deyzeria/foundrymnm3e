const PowerEffects =
    {
        affliction: {
            cost: 1,
            type: 'attack',
            action: 'standard',
            range: 'close',
            duration: 'instant',
            savingthrow: 'fortitude' //Add here selection
        },
        burrowing: {
            cost: 1,
            type: 'movement',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        communication: {
            cost: 4,
            type: 'sensory',
            action: 'free',
            range: 'rank',
            duration: 'sustained',
            savingthrow: 'none',
            max_ranks: 5
        },
        comprehend: {
            cost: 2,
            type: 'sensory',
            action: 'none',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        concealment: {
            cost: 2,
            type: 'sensory',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none',
            manual_purchase: false,
        },
        create: {
            cost: 2,
            type: 'control',
            action: 'standard',
            range: 'ranged',
            duration: 'sustained',
            savingthrow: 'none'
        },
        damage: {
            cost: 1,
            type: 'attack',
            action: 'standard',
            range: 'close',
            duration: 'instant',
            savingthrow: 'none',
            damage: 'toughness'
        },
        deflect: {
            cost: 1,
            type: 'defence',
            action: 'standard',
            range: 'ranged',
            duration: 'instant',
            savingthrow: 'none'
        },
        elongation: {
            cost: 1,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        enhancedability: {
            cost: 2,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none',
            manual_purchase: false,
        },
        enhancedextra: {
            cost: 1,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none',
            manual_purchase: false,
        },
        enhancedtrait: {
            cost: 1,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none',
            manual_purchase: false,
        },
        environment: {
            cost: 0,
            type: 'control',
            action: 'standard',
            range: 'rank',
            duration: 'sustained',
            savingthrow: 'none'
        },
        limbs: {
            cost: 1,
            type: 'general',
            action: 'none',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        feature: {
            cost: 1,
            type: 'general',
            action: 'none',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        flight: {
            cost: 2,
            type: 'movement',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        growth: {
            cost: 2,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        healing: {
            cost: 2,
            type: 'general',
            action: 'standard',
            range: 'c;pse',
            duration: 'instant',
            savingthrow: 'none'
        },
        illusion: {
            cost: 0,
            type: 'control',
            action: 'standard',
            range: 'perception',
            duration: 'sustained',
            savingthrow: 'none',
            manual_purchase: false
        },
        immortality: {
            cost: 2,
            type: 'defence',
            action: 'none',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        immunity: {
            cost: 1,
            type: 'defence',
            action: 'none',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        impervious: {
            cost: 1,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'continuous',
            savingthrow: 'none'
        },
        insubstantial: {
            cost: 5,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none',
            max_ranks: 4
        },
        leaping: {
            cost: 1,
            type: 'movement',
            action: 'free',
            range: 'personal',
            duration: 'instant',
            savingthrow: 'none'
        },
        luckcontrol: {
            cost: 3,
            type: 'control',
            action: 'reaction',
            range: 'perception',
            duration: 'instant',
            savingthrow: 'none'
        },
        mindreading: {
            cost: 2,
            type: 'sensory',
            action: 'standard',
            range: 'perception',
            duration: 'sustained',
            savingthrow: 'will'
        },
        morph: {
            cost: 5,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        moveobject: {
            cost: 2,
            type: 'control',
            action: 'standard',
            range: 'ranged',
            duration: 'sustained',
            savingthrow: 'none'
        },
        movement: {
            cost: 2,
            type: 'movement',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        nullify: {
            cost: 1,
            type: 'attack',
            action: 'standard',
            range: 'ranged',
            duration: 'instant',
            savingthrow: 'will'
        }, // Here it's Will/Rank
        protection: {
            cost: 1,
            type: 'defense',
            action: 'none',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        quickness: {
            cost: 1,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        regeneration: {
            cost: 1,
            type: 'defense',
            action: 'none',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        remotesense: {
            cost: 0,
            type: 'sensory',
            action: 'free',
            range: 'rank',
            duration: 'sustained',
            savingthrow: 'none'
        },
        senses: {
            cost: 1,
            type: 'sensory',
            action: 'none',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        shrinking: {
            cost: 2,
            type: 'general',
            action: 'free',
            range: 'personal',
            duration: 'permanent',
            savingthrow: 'none'
        },
        speed: {
            cost: 1,
            type: 'movement',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        summon: {
            cost: 1,
            type: 'control',
            action: 'standard',
            range: 'close',
            duration: 'sustained',
            savingthrow: 'none'
        },
        swimming: {
            cost: 1,
            type: 'movement',
            action: 'free',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        teleport: {
            cost: 2,
            type: 'movement',
            action: 'move',
            range: 'rank',
            duration: 'instant',
            savingthrow: 'none'
        },
        transform: {
            cost: 0,
            type: 'control',
            action: 'standard',
            range: 'close',
            duration: 'sustained',
            savingthrow: 'none'
        },
        variable: {
            cost: 7,
            type: 'general',
            action: 'standard',
            range: 'personal',
            duration: 'sustained',
            savingthrow: 'none'
        },
        weaken: {
            cost: 1,
            type: 'attack',
            action: 'standard',
            range: 'close',
            duration: 'instant',
            savingthrow: 'fortitude'
        }
    };

    const C = CONFIG.MNM3E;

    const afflictionData = {
        rank1: [],
        rank2: [],
        rank3: [],
    }

export default function GetPowerData(request){
    return PowerEffects[request]; 
}