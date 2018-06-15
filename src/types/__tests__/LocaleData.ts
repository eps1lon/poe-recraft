// tslint:disable:no-unused-variable
import * as LocaleData from '../LocaleData';

// we only want to check typings so we dont actually run this test
// but verify it with ts (build:verify)
describe.skip('type definitions matching json files in locale-data', () => {
  /**
   * courtesy of https://github.com/Microsoft/TypeScript/issues/12936#issuecomment-368244671
   *
   * allows an exact match between T and X
   * usually assiging X to T would be fine because X extends T
   * but we want to make sure in our type definitions that we caught all possible
   * fields.
   */
  type Exactify<T, X extends T> = T &
    { [K in keyof X]: K extends keyof T ? Exactify<T[K], X[K]> : never };

  // eps1lon: going with dynamic here so that ts-jest does not transpile
  // and require the hole json despite no test actually runs here
  // but with a static string so that the ts compiler can infer typings
  test('AchievementItems', async () => {
    const json = await import('../../../locale-data/en/AchievementItems.json');
    const checked: Exactify<LocaleData.AchievementItems, typeof json> = json;
  });
  test('Achievement', async () => {
    const json = await import('../../../locale-data/en/Achievements.json');
    const checked: Exactify<LocaleData.Achievements, typeof json> = json;
  });
  test('ActiveSkills', async () => {
    const json = await import('../../../locale-data/en/ActiveSkills.json');
    const checked: Exactify<LocaleData.ActiveSkills, typeof json> = json;
  });
  test('BaseItemTypes', async () => {
    const json = await import('../../../locale-data/en/BaseItemTypes.json');
    const checked: Exactify<LocaleData.BaseItemTypes, typeof json> = json;
  });
  test('BuffDefinitions', async () => {
    const json = await import('../../../locale-data/en/BuffDefinitions.json');
    const checked: Exactify<LocaleData.BuffDefinitions, typeof json> = json;
  });
  test('Characters', async () => {
    const json = await import('../../../locale-data/en/Characters.json');
    const checked: Exactify<LocaleData.Characters, typeof json> = json;
  });
  test('CharacterStartStates', async () => {
    const json = await import('../../../locale-data/en/CharacterStartStates.json');
    const checked: Exactify<
      LocaleData.CharacterStartStates,
      typeof json
    > = json;
  });
  test('Chests', async () => {
    const json = await import('../../../locale-data/en/Chests.json');
    const checked: Exactify<LocaleData.Chests, typeof json> = json;
  });
  test('Commands', async () => {
    const json = await import('../../../locale-data/en/Commands.json');
    const checked: Exactify<LocaleData.Commands, typeof json> = json;
  });
  test('CraftingBenchOptions', async () => {
    const json = await import('../../../locale-data/en/CraftingBenchOptions.json');
    const checked: Exactify<
      LocaleData.CraftingBenchOptions,
      typeof json
    > = json;
  });
  test('CurrencyItems', async () => {
    const json = await import('../../../locale-data/en/CurrencyItems.json');
    const checked: Exactify<LocaleData.CurrencyItems, typeof json> = json;
  });
  test('DailyMissions', async () => {
    const json = await import('../../../locale-data/en/DailyMissions.json');
    const checked: Exactify<LocaleData.DailyMissions, typeof json> = json;
  });
  test('ItemClasses', async () => {
    const json = await import('../../../locale-data/en/ItemClasses.json');
    const checked: Exactify<LocaleData.ItemClasses, typeof json> = json;
  });
  test('ItemThemes', async () => {
    const json = await import('../../../locale-data/en/ItemThemes.json');
    const checked: Exactify<LocaleData.ItemThemes, typeof json> = json;
  });
  test('Labyrinths', async () => {
    const json = await import('../../../locale-data/en/Labyrinths.json');
    const checked: Exactify<LocaleData.Labyrinths, typeof json> = json;
  });
  test('LabyrinthSecrets', async () => {
    const json = await import('../../../locale-data/en/LabyrinthSecrets.json');
    const checked: Exactify<LocaleData.LabyrinthSecrets, typeof json> = json;
  });
  test('MapPins', async () => {
    const json = await import('../../../locale-data/en/MapPins.json');
    const checked: Exactify<LocaleData.MapPins, typeof json> = json;
  });
  test('Mods', async () => {
    const json = await import('../../../locale-data/en/Mods.json');
    const checked: Exactify<LocaleData.Mods, typeof json> = json;
  });
  test('MonsterVarieties', async () => {
    const json = await import('../../../locale-data/en/MonsterVarieties.json');
    const checked: Exactify<LocaleData.MonsterVarieties, typeof json> = json;
  });
  test('NPCs', async () => {
    const json = await import('../../../locale-data/en/NPCs.json');
    const checked: Exactify<LocaleData.NPCs, typeof json> = json;
  });
  test('PantheonPanelLayout', async () => {
    const json = await import('../../../locale-data/en/PantheonPanelLayout.json');
    const checked: Exactify<LocaleData.PantheonPanelLayout, typeof json> = json;
  });
  test('PassiveSkills', async () => {
    const json = await import('../../../locale-data/en/PassiveSkills.json');
    const checked: Exactify<LocaleData.PassiveSkills, typeof json> = json;
  });
  test('Prophecies', async () => {
    const json = await import('../../../locale-data/en/Prophecies.json');
    const checked: Exactify<LocaleData.Prophecies, typeof json> = json;
  });
  test('Quest', async () => {
    const json = await import('../../../locale-data/en/Quest.json');
    const checked: Exactify<LocaleData.Quest, typeof json> = json;
  });
  test('Realms', async () => {
    const json = await import('../../../locale-data/en/Realms.json');
    const checked: Exactify<LocaleData.Realms, typeof json> = json;
  });
  test('ShopItem', async () => {
    const json = await import('../../../locale-data/en/ShopItem.json');
    const checked: Exactify<LocaleData.ShopItem, typeof json> = json;
  });
  test('ShopToken', async () => {
    const json = await import('../../../locale-data/en/ShopToken.json');
    const checked: Exactify<LocaleData.ShopToken, typeof json> = json;
  });
  test('Shrines', async () => {
    const json = await import('../../../locale-data/en/Shrines.json');
    const checked: Exactify<LocaleData.Shrines, typeof json> = json;
  });
  test('SkillGems', async () => {
    const json = await import('../../../locale-data/en/SkillGems.json');
    const checked: Exactify<LocaleData.SkillGems, typeof json> = json;
  });
  test('WarbandsPackMonsters', async () => {
    const json = await import('../../../locale-data/en/WarbandsPackMonsters.json');
    const checked: Exactify<
      LocaleData.WarbandsPackMonsters,
      typeof json
    > = json;
  });
  test('WorldAreas', async () => {
    const json = await import('../../../locale-data/en/WorldAreas.json');
    const checked: Exactify<LocaleData.WorldAreas, typeof json> = json;
  });
});
