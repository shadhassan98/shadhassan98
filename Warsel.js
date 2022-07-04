import React, { useEffect, useRef } from 'react';
import LayoutComponentContainer from '../../ReusableComponents/LayoutComponent/LayoutComponentContainer';
import TileComponentContainer from '../../ReusableComponents/TileComponent/TileComponentContainer';
import DatePickerComponent from '../../../CommonComponent/DatePickerComponent/DatePickerComponent';
import CommonModalContainer from '../../ReusableComponents/CommonModal/CommonModalContainer';
import './ReportingEntity.scss';
import {
  SECFilingTiles,
  DomFPITiles,
  entityTypeTiles,
  secFilingForOtherReason,
  articleOptionsNotPublic,
  SECRegistrantTiles,
  GoingPublicTiles,
} from './ReportingEntityList';

const ReportingEntityContent = ({
  checklistData,
  dateOnChangeHandler,
  handleSecFilingOnClick,
  handleSecRegistrantOnClick,
  handledomesticFPIOnClick,
  handleIsPublicOnClick,
  handleEntityTypeOnClick,
  checklistScreenArray,
  buttonDisabled,
  onBackClickHandler,
  onContinueClickHandler,
  onSaveAndQuithandler,
  handleArticleClick,
  handleSecFilingNotGoingPublic,
  showPublicEntityMessage,
  setShowPublicEntityMessage,

  showNonPublicEntityMessage,
  setNonShowPublicEntityMessage,
}) => {
  const displaySECTiles = (Tiles, handler, selectedTileList, tooltipRequired, textOnlyTile) => {
    return Tiles.map((each, id) => {
      return (
        <TileComponentContainer
          key={id}
          TileData={each}
          handelIndustryOnClick={handler}
          selectedTileList={selectedTileList}
          TileWidth={'lg'}
          tileTooltipRequired={tooltipRequired}
          tileTooltipContent={each.tooltipText}
          tileTooltipId={id}
          tileTextOnly={textOnlyTile}
        />
      );
    });
  };

  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef?.current.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });
  };

  useEffect(() => {
    scrollToBottom();
  });
  return (
    <>
      <LayoutComponentContainer
        childComponentBodyClass="pwc-reporting-entity-container"
        checklistName={checklistData.checklistName}
        screenList={checklistScreenArray}
        onBackClickHandler={onBackClickHandler}
        onContinueClickHandler={onContinueClickHandler}
        onSaveAndQuithandler={onSaveAndQuithandler}
        buttonDisabled={buttonDisabled}
        childComponent={
          <>
            <div className="reporting-entity-container">
              <div
                className={`reporting-entity-financial-statements ${
                  checklistData.isSecFiling[0] && 'complete-step'
                }`}
              >
                <div
                  className={`reporting-entity-inner-div ${
                    checklistData.isSecFiling[0] && 'complete-step'
                  }`}
                >
                  <SECHeader
                    tabHeading={
                      "Will the reporting entity's financial statements be included in an SEC filing?"
                    }
                  />
                  <div className="d-flex justify-content-center a-mt-30">
                    {displaySECTiles(
                      SECFilingTiles,
                      handleSecFilingOnClick,
                      checklistData.isSecFiling,
                      true,
                    )}
                  </div>
                  {/* {checklistData.isSecFiling[0] && <hr />} */}
                </div>
              </div>
              {checklistData.isSecFiling.includes('privatefp') && (
                <>
                  <div
                    className={`reporting-entity-sec-registrant ${
                      checklistData.isEntityType[0] && 'complete-step'
                    }`}
                  >
                    <div className="reporting-entity-inner-div">
                      <SECHeader tabHeading={'Select the appropriate entity type'} />
                      {/* after demo remove below div */}
                      {/* <div className="d-flex justify-content-center a-mt-30">
                        <div className="col-md-4 for-demo-1">
                          <a
                            className={`help-text`}
                            onClick={() => setShowPublicEntityMessage(true)}
                          >
                            Help Text public entity
                          </a>
                        </div>
                        <div className="col-md-4 for-demo-2">
                          <a
                            className={`help-text`}
                            onClick={() => setNonShowPublicEntityMessage(true)}
                          >
                            Help Text Non public entity
                          </a>
                        </div>
                      </div> */}
                      <div className="d-flex justify-content-center a-mt-30">
                        {displaySECTiles(
                          entityTypeTiles,
                          handleEntityTypeOnClick,
                          checklistData.isEntityType,
                          false,
                        )}
                      </div>
                      {/* {checklistData.isSecRegistrant[0] && <hr />} */}
                    </div>
                  </div>
                </>
              )}
              {checklistData.isSecFiling.includes('fake_yes') && (
                <>
                  <div
                    className={`secFilingDate ${checklistData.secFilingDate && 'complete-step'}`}
                  >
                    <div className="reporting-entity-inner-div">
                      <div className="a-panel a-p-10 a-shadow-sm a-m-30 p-4">
                        <label className="secFilingDate-label">
                          Expected SEC filing date for financial statements
                        </label>
                        <div className="col-4 sec-filing-date-picker pl-0">
                          <DatePickerComponent
                            datePickerOnChangeHandler={dateOnChangeHandler}
                            datepickerValue={checklistData.secFilingDate}
                            dateFormat={'MM-dd-yyyy'}
                            datePickerName={'secFilingDate'}
                            scrollBodyClassName={'pwc-reporting-entity-container'}
                          />
                        </div>
                      </div>
                      {/* {checklistData.secFilingDate && <hr />} */}
                    </div>
                  </div>
                </>
              )}
              {checklistData.isSecFiling.includes('fake_yes') && checklistData.secFilingDate && (
                <>
                  <div
                    className={`reporting-entity-sec-registrant ${
                      checklistData.isSecRegistrant[0] && 'complete-step'
                    }`}
                  >
                    <div className="reporting-entity-inner-div">
                      <SECHeader tabHeading={'Is the reporting entity an SEC registrant?'} />
                      <div className="d-flex justify-content-center a-mt-30">
                        {displaySECTiles(
                          SECRegistrantTiles,
                          handleSecRegistrantOnClick,
                          checklistData.isSecRegistrant,
                          false,
                        )}
                      </div>
                      {/* {checklistData.isSecRegistrant[0] && <hr />} */}
                    </div>
                  </div>
                </>
              )}
              {checklistData.isSecFiling.includes('fake_yes') &&
                checklistData.secFilingDate &&
                checklistData.isSecRegistrant.includes('fake_no') && (
                  <>
                    <div
                      className={`reporting-entity-going-public ${
                        checklistData.isGoingPublic[0] && 'complete-step'
                      }`}
                    >
                      <div className="reporting-entity-inner-div">
                        <SECHeader
                          tabHeading={'Is the reporting entity in the process of going public?'}
                        />
                        <div className="row justify-content-center a-mt-30">
                          {displaySECTiles(
                            GoingPublicTiles,
                            handleIsPublicOnClick,
                            checklistData.isGoingPublic,
                            false,
                          )}
                        </div>
                        {/* {checklistData.isGoingPublic[0] && <hr />} */}
                      </div>
                    </div>
                  </>
                )}
              {(checklistData.isSecRegistrant.includes('publicfp') ||
                checklistData.isGoingPublic.includes('fake_yes')) &&
                checklistData.isSecFiling.includes('fake_yes') &&
                checklistData.secFilingDate && (
                  <>
                    <div
                      className={`reporting-entity-domestic-registrant ${
                        checklistData.isDomesticFPI[0] && 'complete-step'
                      }`}
                    >
                      <div className="reporting-entity-inner-div">
                        <SECHeader
                          tabHeading={
                            'Does/will the reporting entity file as a Domestic registrant or as a Foreign Private Issuer (FPI) in the current reporting period?'
                          }
                        />
                        <div className="d-flex justify-content-center a-mt-30">
                          {displaySECTiles(
                            DomFPITiles,
                            handledomesticFPIOnClick,
                            checklistData.isDomesticFPI,
                            true,
                          )}
                        </div>
                        {/* {checklistData.isDomesticFPI && <hr />} */}
                      </div>
                    </div>
                  </>
                )}
              {checklistData.isGoingPublic.includes('fake_no') && (
                <NotGoingPublic
                  handleSecFilingNotGoingPublic={handleSecFilingNotGoingPublic}
                  checklistData={checklistData}
                  handleArticleClick={handleArticleClick}
                  displaySECTiles={displaySECTiles}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          </>
        }
      />
      {showPublicEntityMessage && (
        <CommonModalContainer
          warningModal={false}
          modalFooterVisible={false}
          modalGreyBody={true}
          modalSize={'large'}
          modalTitle="Public business entity"
          buttonName={[]}
          buttonFunction={[() => setShowPublicEntityMessage(false)]}
          modalBody={publicEntityBody()}
          showModal={showPublicEntityMessage}
        />
      )}
      {showNonPublicEntityMessage && (
        <CommonModalContainer
          warningModal={false}
          modalFooterVisible={false}
          modalGreyBody={true}
          modalSize={'large'}
          modalTitle="Public entity"
          buttonName={[]}
          buttonFunction={[() => setNonShowPublicEntityMessage(false)]}
          modalBody={nonPublicEntityBody()}
          showModal={showNonPublicEntityMessage}
        />
      )}
    </>
  );
};

const NotGoingPublic = ({
  checklistData,
  handleSecFilingNotGoingPublic,
  handleArticleClick,
  displaySECTiles,
}) => {
  let { includedSecNotGoingPublic, articleSelected } = checklistData;
  return (
    <div>
      <>
        <div
          className={`reporting-entity-going-public ${
            includedSecNotGoingPublic[0] && 'complete-step'
          }`}
        >
          <div className="reporting-entity-inner-div">
            <SECHeader
              tabHeading={
                "Please select the reason why the reporting entity's financial statements are included in an SEC filing."
              }
            />
            <div className="row justify-content-center a-mt-30">
              {displaySECTiles(
                secFilingForOtherReason,
                handleSecFilingNotGoingPublic,
                includedSecNotGoingPublic,
                null,
                true,
              )}
            </div>

            <div className="text-center mb-3">
              <span className="a-form-error warning-text">
                If none of these apply, consider revisiting responses to prior questions{' '}
              </span>
            </div>
          </div>
        </div>
      </>
      {(includedSecNotGoingPublic.includes('sx305') ||
        includedSecNotGoingPublic.includes('sx309')) && (
        <>
          <div className={`reporting-entity-file ${articleSelected[0] && 'complete-step'}`}>
            <div className="reporting-entity-inner-div">
              <SECHeader
                tabHeading={
                  'Under which SEC article would the reporting entity file if it were an SEC registrant?'
                }
                subHeading={'Select all that apply'}
              />
              <div className="row justify-content-center a-mt-30">
                {displaySECTiles(articleOptionsNotPublic, handleArticleClick, articleSelected)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SECHeader = ({ tabHeading, subHeading }) => {
  return (
    <>
      <h2 className="page-heading">{tabHeading}</h2>
      {subHeading && (
        <h3 id="sec-subHeading" className="sub-heading">
          {subHeading}
        </h3>
      )}
    </>
  );
};

const publicEntityBody = () => {
  return (
    <>
      <div className="pwc-common-text-modal-body">
        A public business entity is a business entity meeting any one of the criteria below. Neither
        a not-for-profit entity nor an employee benefit plan is a business entity.
        <ol type="a">
          <li>
            It is required by the U.S. Securities and Exchange Commission (SEC) to file or furnish
            financial statements or does file or furnish financial statements (including voluntary
            filers), with the SEC (including other entities whose financial statements or financial
            information are required to be or are included in a filing).
          </li>
          <li>
            It is required by the Securities Exchange Act of 1934 (the Act), as amended, or rules or
            regulations promulgated under the Act, to file or furnish financial statements with a
            regulatory agency other than the SEC.
          </li>
          <li>
            It is required to file or furnish financial statements with a foreign or domestic
            regulatory agency in preparation for the sale of or for purposes of issuing securities
            that are not subject to contractual restrictions on transfer.
          </li>
          <li>
            It has issued, or is a conduit bond obligor for, securities that are traded, listed, or
            quoted on an exchange or an over-the-counter market.
          </li>
          <li>
            It has one or more securities that are not subject to contractual restrictions on
            transfer, and it is required by law, contract, or regulation to prepare U.S. GAAP
            financial statements (including notes) and make them publicly available on a periodic
            basis (for example, interim or annual periods). An entity must meet both of these
            conditions to meet this criterion.
          </li>
        </ol>
        An entity may meet the definition of a public business entity solely because its financial
        statements or financial information is included in another entity&apos;s filing with the
        SEC. In that case, the entity is only a public business entity for purposes of financial
        statements that are filed or furnished with the SEC.
      </div>
    </>
  );
};
const nonPublicEntityBody = () => {
  return (
    <>
      <div className="pwc-common-text-modal-body">
        All other reporting entities that don&apos;t meet the definition of a public business entity
        <br />
        <br />A public business entity is a business entity meeting any one of the criteria below.
        Neither a not-for-profit entity nor an employee benefit plan is a business entity.
        <ol type="a">
          <li>
            It is required by the U.S. Securities and Exchange Commission (SEC) to file or furnish
            financial statements or does file or furnish financial statements (including voluntary
            filers), with the SEC (including other entities whose financial statements or financial
            information are required to be or are included in a filing).
          </li>
          <li>
            It is required by the Securities Exchange Act of 1934 (the Act), as amended, or rules or
            regulations promulgated under the Act, to file or furnish financial statements with a
            regulatory agency other than the SEC.
          </li>
          <li>
            It is required to file or furnish financial statements with a foreign or domestic
            regulatory agency in preparation for the sale of or for purposes of issuing securities
            that are not subject to contractual restrictions on transfer.
          </li>
          <li>
            It has issued, or is a conduit bond obligor for, securities that are traded, listed, or
            quoted on an exchange or an over-the-counter market.
          </li>
          <li>
            It has one or more securities that are not subject to contractual restrictions on
            transfer, and it is required by law, contract, or regulation to prepare U.S. GAAP
            financial statements (including notes) and make them publicly available on a periodic
            basis (for example, interim or annual periods). An entity must meet both of these
            conditions to meet this criterion.
          </li>
        </ol>
        An entity may meet the definition of a public business entity solely because its financial
        statements or financial information is included in another entity&apos;s filing with the
        SEC. In that case, the entity is only a public business entity for purposes of financial
        statements that are filed or furnished with the SEC.
      </div>
    </>
  );
};
export default ReportingEntityContent;
