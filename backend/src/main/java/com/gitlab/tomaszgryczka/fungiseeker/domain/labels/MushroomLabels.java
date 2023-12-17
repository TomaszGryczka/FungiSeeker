package com.gitlab.tomaszgryczka.fungiseeker.domain.labels;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;

import java.util.HashMap;
import java.util.Map;

public class MushroomLabels {

    public static Map<Long, MushroomLabel> mushrooms = new HashMap<>() {{
        put(1L, MushroomLabel.builder().label("amanita_citrina").translation("Muchomor cytrynowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(2L, MushroomLabel.builder().label("cerioporus_squamosus").translation("Żagwiak łuskowaty").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(3L, MushroomLabel.builder().label("crucibulum_laeve").translation("Kubecznik pospolity").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(4L, MushroomLabel.builder().label("gyromitra_infula").translation("Piestrzenica infułowata").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(5L, MushroomLabel.builder().label("leccinum_albostipitatum").translation("Koźlarz białotrzonowy").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(6L, MushroomLabel.builder().label("paxillus_involutus").translation("Krowiak podwinięty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(7L, MushroomLabel.builder().label("pleurotus_pulmonarius").translation("Boczniak łyżkowaty").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(8L, MushroomLabel.builder().label("trametes_ochracea").translation("Wrośniak strefowany").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(9L, MushroomLabel.builder().label("amanita_muscaria").translation("Muchomor czerwony").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(10L, MushroomLabel.builder().label("cetraria_islandica").translation("Płucnica islandzka").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(11L, MushroomLabel.builder().label("daedaleopsis_confragosa").translation("Gmatwica chropowata").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(12L, MushroomLabel.builder().label("hericium_coralloides").translation("Soplówka bukowa").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(13L, MushroomLabel.builder().label("leccinum_aurantiacum").translation("Koźlarz czerwony").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(14L, MushroomLabel.builder().label("peltigera_aphthosa").translation("Pawężnica brodawkowata").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(15L, MushroomLabel.builder().label("pseudevernia_furfuracea").translation("Mąklik otrębiasty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(16L, MushroomLabel.builder().label("trametes_versicolor").translation("Wrośniak różnobarwny").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(17L, MushroomLabel.builder().label("amanita_pantherina").translation("Muchomor plamisty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(18L, MushroomLabel.builder().label("chlorociboria_aeruginascens").translation("Chlorówka drobna").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(19L, MushroomLabel.builder().label("daedaleopsis_tricolor").translation("Gmatwica trójbarwna").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(20L, MushroomLabel.builder().label("hygrophoropsis_aurantiaca").translation("Lisówka pomarańczowa").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(21L, MushroomLabel.builder().label("leccinum_scabrum").translation("Koźlarz babka").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(22L, MushroomLabel.builder().label("peltigera_praetextata").translation("Pawężnica łuseczkowata").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(23L, MushroomLabel.builder().label("rhytisma_acerinum").translation("Łuszczeniec klonowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(24L, MushroomLabel.builder().label("tremella_mesenterica").translation("Trzęsak pomarańczowożółty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(25L, MushroomLabel.builder().label("amanita_rubescens").translation("Muchomor czerwieniejący").score(Score.TASTY).edibility(Edibility.EDIBLE).build());
        put(26L, MushroomLabel.builder().label("chondrostereum_purpureum").translation("Chrząstkoskórnik purpurowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(27L, MushroomLabel.builder().label("evernia_mesomorpha").translation("Mąkla odeminna").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(28L, MushroomLabel.builder().label("hypholoma_fasciculare").translation("Maślanka wiązkowa").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(29L, MushroomLabel.builder().label("leccinum_versipelle").translation("Koźlarz pomarańczowożółty").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(30L, MushroomLabel.builder().label("phaeophyscia_orbicularis").translation("Orzast kolisty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(31L, MushroomLabel.builder().label("sarcomyxa_serotina").translation("Łycznik późny").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(32L, MushroomLabel.builder().label("trichaptum_biforme").translation("Trichaptum").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(33L, MushroomLabel.builder().label("apioperdon_pyriforme").translation("Purchawka gruszkowata").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(34L, MushroomLabel.builder().label("cladonia_fimbriata").translation("Chrobotek strzępiasty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(35L, MushroomLabel.builder().label("evernia_prunastri").translation("Mąkla tarniowa").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(36L, MushroomLabel.builder().label("hypholoma_lateritium").translation("Maślanka ceglasta").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(37L, MushroomLabel.builder().label("lepista_nuda").translation("Gąsówka fioletowawa").score(Score.VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(38L, MushroomLabel.builder().label("phallus_impudicus").translation("Sromotnik smrodliwy").score(Score.TASTY).edibility(Edibility.EDIBLE).build());
        put(39L, MushroomLabel.builder().label("sarcoscypha_austriaca").translation("Czarka austriacka").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(40L, MushroomLabel.builder().label("tricholomopsis_rutilans").translation("Rycerzyk czerwonozłoty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(41L, MushroomLabel.builder().label("armillaria_borealis").translation("Opieńka północna").score(Score.TASTY).edibility(Edibility.EDIBLE).build());
        put(42L, MushroomLabel.builder().label("cladonia_rangiferina").translation("Chrobotek reniferowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(43L, MushroomLabel.builder().label("flammulina_velutipes").translation("Flammulina").score(Score.VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(44L, MushroomLabel.builder().label("hypogymnia_physodes").translation("Pustułka pęcherzykowata").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(45L, MushroomLabel.builder().label("lobaria_pulmonaria").translation("Granicznik płucnik").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(46L, MushroomLabel.builder().label("phellinus_igniarius").translation("Czyreń ogniowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(47L, MushroomLabel.builder().label("sarcosoma_globosum").translation("Dzbankówka kulista").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(48L, MushroomLabel.builder().label("urnula_craterium").translation("Urna kraterowata").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(49L, MushroomLabel.builder().label("artomyces_pyxidatus").translation("Świecznik rozgałęziony").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(50L, MushroomLabel.builder().label("cladonia_stellaris").translation("Chrobotek alpejski").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(51L, MushroomLabel.builder().label("fomes_fomentarius").translation("Hubiak pospolity").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(52L, MushroomLabel.builder().label("imleria_badia").translation("Podgrzyb brunatny").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(53L, MushroomLabel.builder().label("lycoperdon_perlatum").translation("Purchawka chropowata").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(54L, MushroomLabel.builder().label("phellinus_tremulae").translation("Czyreń osikowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(55L, MushroomLabel.builder().label("schizophyllum_commune").translation("Rozszczepka pospolita").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(56L, MushroomLabel.builder().label("verpa_bohemica").translation("Naparstniczka czeska").score(Score.TASTY).edibility(Edibility.EDIBLE).build());
        put(57L, MushroomLabel.builder().label("bjerkandera_adusta").translation("Szaroporka podpalana").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(58L, MushroomLabel.builder().label("clitocybe_nebularis").translation("Lejkówka szarawa").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(59L, MushroomLabel.builder().label("fomitopsis_betulina").translation("Pniarek brzozowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(60L, MushroomLabel.builder().label("inonotus_obliquus").translation("Błyskoporek podkorowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(61L, MushroomLabel.builder().label("macrolepiota_procera").translation("Czubajka kania").score(Score.VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(62L, MushroomLabel.builder().label("phlebia_radiata").translation("Żylak promienisty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(63L, MushroomLabel.builder().label("stereum_hirsutum").translation("Skórnik szorstki").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(64L, MushroomLabel.builder().label("vulpicida_pinastri").translation("Złotlinka jaskrawa").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(65L, MushroomLabel.builder().label("boletus_edulis").translation("Borowik szlachetny").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(66L, MushroomLabel.builder().label("coltricia_perennis").translation("Stułka piaskowa").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(67L, MushroomLabel.builder().label("fomitopsis_pinicola").translation("Pniarek obrzeżony").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(68L, MushroomLabel.builder().label("kuehneromyces_mutabilis").translation("Łuskwiak zmienny").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(69L, MushroomLabel.builder().label("merulius_tremellosus").translation("Żylak trzęsakowaty").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(70L, MushroomLabel.builder().label("pholiota_aurivella").translation("Łuskwiak złotawy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(71L, MushroomLabel.builder().label("stropharia_aeruginosa").translation("Pierścieniak grynszpanowy").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(72L, MushroomLabel.builder().label("xanthoria_parietina").translation("Złotorost ścienny").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(73L, MushroomLabel.builder().label("boletus_reticulatus").translation("Borowik usiatkowany").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(74L, MushroomLabel.builder().label("coprinellus_disseminatus").translation("Czernidłak gromadny").score(Score.NOT_VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(75L, MushroomLabel.builder().label("ganoderma_applanatum").translation("Lakownica spłaszczona").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(76L, MushroomLabel.builder().label("lactarius_deliciosus").translation("Mleczaj rydz").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(77L, MushroomLabel.builder().label("mutinus_ravenelii").translation("Mądziak malinowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(78L, MushroomLabel.builder().label("pholiota_squarrosa").translation("Łuskwiak nastroszony").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(79L, MushroomLabel.builder().label("suillus_granulatus").translation("Maślak ziarnisty").score(Score.VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(80L, MushroomLabel.builder().label("calocera_viscosa").translation("Pięknoróg największy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(81L, MushroomLabel.builder().label("coprinellus_micaceus").translation("Czernidłak błyszczący").score(Score.TASTY).edibility(Edibility.EDIBLE).build());
        put(82L, MushroomLabel.builder().label("graphis_scripta").translation("Literak właściwy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(83L, MushroomLabel.builder().label("lactarius_torminosus").translation("Mleczaj wełnianka").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(84L, MushroomLabel.builder().label("nectria_cinnabarina").translation("Gruzełek cynobrowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(85L, MushroomLabel.builder().label("physcia_adscendens").translation("Obrost wzniesiony").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(86L, MushroomLabel.builder().label("suillus_grevillei").translation("Maślak żółty").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(87L, MushroomLabel.builder().label("calycina_citrina").translation("Dwuzarodniczka cytrynowa").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(88L, MushroomLabel.builder().label("coprinopsis_atramentaria").translation("Czernidłak pospolity").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(89L, MushroomLabel.builder().label("gyromitra_esculenta").translation("Piestrzenica kasztanowata").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(90L, MushroomLabel.builder().label("lactarius_turpis").translation("Mleczaj paskudnik").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(91L, MushroomLabel.builder().label("panellus_stipticus").translation("Łycznik ochrowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(92L, MushroomLabel.builder().label("platismatia_glauca").translation("Płucnik modry").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(93L, MushroomLabel.builder().label("suillus_luteus").translation("Maślak zwyczajny").score(Score.DELICIOUS).edibility(Edibility.EDIBLE).build());
        put(94L, MushroomLabel.builder().label("cantharellus_cibarius").translation("Pieprznik jadalny").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(95L, MushroomLabel.builder().label("coprinus_comatus").translation("Czernidłak kołpakowaty").score(Score.VERY_TASTY).edibility(Edibility.EDIBLE).build());
        put(96L, MushroomLabel.builder().label("gyromitra_gigas").translation("Piestrzenica olbrzymia").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(97L, MushroomLabel.builder().label("laetiporus_sulphureus").translation("Żółciak siarkowy").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(98L, MushroomLabel.builder().label("parmelia_sulcata").translation("Tarczownica bruzdkowana").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
        put(99L, MushroomLabel.builder().label("pleurotus_ostreatus").translation("Boczniak ostrygowaty").score(Score.TASTY).edibility(Edibility.EDIBLE).build());
        put(100L, MushroomLabel.builder().label("trametes_hirsuta").translation("Wrośniak szorstki").score(Score.INEDIBLE).edibility(Edibility.INEDIBLE).build());
    }};

    public enum Edibility {
        EDIBLE,
        INEDIBLE
    }

    @Getter
    @AllArgsConstructor
    public enum Score {
        INEDIBLE(0.0),
        NOT_VERY_TASTY(0.25),
        TASTY(0.5),
        VERY_TASTY(0.75),
        DELICIOUS(1.0);

        private final Double score;
    }

    @Value
    @Builder
    public static class MushroomLabel {
        String label;
        String translation;
        Score score;
        Edibility edibility;
    }
}
