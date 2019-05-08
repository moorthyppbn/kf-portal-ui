import React from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { compose } from 'recompose';
import autobind from 'auto-bind-es5';
import SearchAll from '../SearchAll';
import Category from './Category';
import Row from 'uikit/Row';
import QuickFilterIcon from 'icons/QuickFilterIcon';
import StudyIcon from 'icons/StudyIcon';
import BiospecimenIcon from 'icons/BiospecimenIcon';
import ClinicalIcon from 'icons/ClinicalIcon';
import FileIcon from 'icons/FileIcon';
import DemographicIcon from 'icons/DemographicIcon';

const Container = styled(Row)`
  height: 72px;
  width: 100%;
  border-left: 1px solid ${({ theme }) => theme.greyScale8};
  background-color: white;
`;

// Categories are arranged so that they display alphabetically on the cohort builder based on the display name from arranger.
//  Check fields on display to make sure they are in alphabetical order.
const CATEGORY_FIELDS = {
  // Results in the Search All will appear in that order.
  searchAll: [
    // Study
    'study.data_access_authority',
    'is_proband',
    'study.short_name',

    // Demographic
    'ethnicity',
    'gender',
    'race',

    // Clinical
    'affected_status',
    // "Cannot query field "buckets" on type "NumericAggregations"."
    // 'diagnoses.age_at_event_days',
    // "Cannot query field "buckets" on type "NumericAggregations"."
    // 'outcome.age_at_event_days',
    // "Cannot query field "buckets" on type "NumericAggregations"."
    // 'phenotype.age_at_event_days',
    'phenotype.ancestral_hpo_ids',
    'diagnoses.source_text_diagnosis',
    'diagnoses.diagnosis',
    'diagnoses.diagnosis_category',
    'family.family_compositions.composition',
    'family.family_compositions.shared_hpo_ids',
    'outcome.disease_related',
    'phenotype.source_text_phenotype',
    'phenotype.hpo_phenotype_observed_text',
    'diagnoses.source_text_tumor_location',
    'outcome.vital_status',

    // Biospecimen
    // "Cannot query field "buckets" on type "NumericAggregations"."
    // 'biospecimens.age_at_event_days',
    'biospecimens.analyte_type',
    'biospecimens.source_text_anatomical_site',
    'biospecimens.ncit_id_anatomical_site',
    'biospecimens.composition',
    'biospecimens.method_of_sample_procurement',
    'biospecimens.source_text_tissue_type',
    'biospecimens.ncit_id_tissue_type',
    'biospecimens.source_text_tumor_descriptor',

    // Available Data
    'available_data_types',
    'files.sequencing_experiments.experiment_strategy',
    'family.family_compositions.available_data_types',
  ],
  quickSearch: [
    'available_data_types',
    'diagnoses.diagnosis',
    'diagnoses.diagnosis_category',
    'phenotype.hpo_phenotype_observed_text',
    'is_proband',
    'study.short_name',
  ],
  study: ['study.data_access_authority', 'is_proband', 'study.short_name'],
  demographic: ['ethnicity', 'gender', 'race'],
  clinical: [
    'affected_status',
    'diagnoses.age_at_event_days',
    'outcome.age_at_event_days',
    'phenotype.age_at_event_days',
    'phenotype.ancestral_hpo_ids',
    'diagnoses.source_text_diagnosis',
    'diagnoses.diagnosis',
    'diagnoses.diagnosis_category',
    'family.family_compositions.composition',
    'family.family_compositions.shared_hpo_ids',
    'outcome.disease_related',
    'phenotype.hpo_phenotype_observed_text',
    'phenotype.source_text_phenotype',
    'diagnoses.source_text_tumor_location',
    'outcome.vital_status',
  ],
  biospecimen: [
    'biospecimens.age_at_event_days',
    'biospecimens.analyte_type',
    'biospecimens.source_text_anatomical_site',
    'biospecimens.ncit_id_anatomical_site',
    'biospecimens.composition',
    'biospecimens.method_of_sample_procurement',
    'biospecimens.source_text_tissue_type',
    'biospecimens.ncit_id_tissue_type',
    'biospecimens.source_text_tumor_descriptor',
  ],
  availableData: [
    'available_data_types',
    'files.sequencing_experiments.experiment_strategy',
    'family.family_compositions.available_data_types',
  ],
};

const CATEGORY_NAMES = {
  quickSearch: 'quickSearch',
  study: 'study',
  clinical: 'clinical',
  biospecimen: 'biospecimen',
  demographic: 'demographic',
  availableData: 'availableData',
};

const excludedCategories = ['searchAll', 'quickSearch'];

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearchField: '',
      currentCategory: null,
    };
    autobind(this);
  }

  handleSqonUpdate(...args) {
    this.setState({ currentSearchField: '' });
    this.props.onSqonUpdate(...args);
  }

  // searching should not open quick filters
  handleSearchField(fieldName) {
    const currentCategoryKey = Object.keys(CATEGORY_FIELDS)
      .filter(key => !excludedCategories.includes(key))
      .find(key => CATEGORY_FIELDS[key].includes(fieldName));
    const currentCategory = CATEGORY_NAMES[currentCategoryKey];
    this.setState({ currentSearchField: fieldName, currentCategory });
  }

  handleCategoryClose() {
    this.setActiveCategory({ fieldName: '', category: null });
  }

  setActiveCategory = ({ category, fieldName }) =>
    this.setState({
      currentCategory: category,
      currentSearchField: fieldName,
    });

  render() {
    const { theme, sqon } = this.props;
    const { currentSearchField, currentCategory } = this.state;

    return (
      <Container>
        
        <Category
          title="Demographic"
         
          onSqonUpdate={this.handleSqonUpdate}
          onClose={this.handleCategoryClose}
          fields={CATEGORY_FIELDS.demographic}
          currentSearchField={currentSearchField}
          color={theme.demographicPurple}
          setActiveCategory={this.setActiveCategory}
          category={CATEGORY_NAMES.demographic}
          currentCategory={currentCategory}
        >
          <DemographicIcon fill={theme.demographicPurple} />
        </Category>
        <Category
          title="Clinical"
          
          onSqonUpdate={this.handleSqonUpdate}
          onClose={this.handleCategoryClose}
          fields={CATEGORY_FIELDS.clinical}
          currentSearchField={currentSearchField}
          color={theme.clinicalBlue}
          setActiveCategory={this.setActiveCategory}
          category={CATEGORY_NAMES.clinical}
          currentCategory={currentCategory}
        >
          <ClinicalIcon width={18} height={17} fill={theme.clinicalBlue} />
        </Category>
        <Category
          title="Biospecimens"
          
          onSqonUpdate={this.handleSqonUpdate}
          onClose={this.handleCategoryClose}
          fields={CATEGORY_FIELDS.biospecimen}
          currentSearchField={currentSearchField}
          color={theme.biospecimenOrange}
          setActiveCategory={this.setActiveCategory}
          category={CATEGORY_NAMES.biospecimen}
          currentCategory={currentCategory}
        >
          <BiospecimenIcon fill={theme.biospecimenOrange} />
        </Category>
      </Container>
    );
  }
}

export default compose(withTheme)(Categories);
