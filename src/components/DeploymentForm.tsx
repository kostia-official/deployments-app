import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { getTemplates } from '../actions/templates';
import styled from 'styled-components';
import { createDeployment } from '../actions/deployments';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

export const DeploymentForm = () => {
  const dispatch = useDispatch();
  const { data: templates } = useSelector((state: RootState) => state.templates);

  // Template name is unique in DB, can be used as key
  const [templateName, setTemplateName] = useState<string>('');
  const [version, setVersion] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);

  const getTemplateVersions = useCallback(() => {
    const selectedTemplate = templates.find((template) => template.name === templateName);
    return selectedTemplate?.versions || [];
  }, [templates, templateName]);

  const onSelectChange = useCallback(
    (setter: Function) => (e: React.ChangeEvent<HTMLSelectElement>) => setter(e.target.value),
    []
  );

  const onUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value),
    [setUrl]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      dispatch(createDeployment({ templateName, version, url }));
    },
    [dispatch, templateName, version, url]
  );

  return (
    <fieldset>
      <legend>Create deployment</legend>
      <form onSubmit={onSubmit}>
        <Wrapper>
          <label>Templates</label>
          <select
            name="templates"
            value={templateName}
            onChange={onSelectChange(setTemplateName)}
            required
          >
            <option value="" />
            {templates.map((template) => (
              <option key={template.name} value={template.name}>
                {template.name}
              </option>
            ))}
          </select>

          {templateName && (
            <>
              <label>Version</label>
              <select
                name="versions"
                value={version}
                onChange={onSelectChange(setVersion)}
                required
              >
                <option value="" />
                {getTemplateVersions().map((versionName) => (
                  <option key={versionName} value={versionName}>
                    {versionName}
                  </option>
                ))}
              </select>
            </>
          )}

          <label>Url</label>
          <input name="url" type="url" value={url} onChange={onUrlChange} required />

          <button type="submit">Create</button>
        </Wrapper>
      </form>
    </fieldset>
  );
};
