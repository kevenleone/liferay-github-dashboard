import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClayAutocomplete from '@clayui/autocomplete';
import ClayDropDown from '@clayui/drop-down';

export default function AutoComplete({
  name, data, value, onChange, itemSelected, onClickItem,
}) {
  const [resource, setResource] = useState(data);
  const loading = true;

  useEffect(() => {
    setResource(data.filter((repo) => repo.name.toLowerCase().includes(value.toLowerCase())));
  }, [data, value]);

  return (
    <ClayAutocomplete>
      <ClayAutocomplete.Input
        name={name}
        onChange={onChange}
        className="custom-input secondary"
        placeholder="liferay-portal"
        value={value}
      />
      <ClayAutocomplete.DropDown
        active={!!value && !!resource && !itemSelected}
      >
        <ClayDropDown.ItemList>
          {((resource.length === 0)) && (
            <ClayDropDown.Item className="disabled">
              No Results Found
            </ClayDropDown.Item>
          )}
          {resource
            && resource.map((item) => (
              <ClayAutocomplete.Item
                onClick={() => onClickItem(item)}
                key={item.id}
                match={value}
                value={item.name}
              />
            ))}
        </ClayDropDown.ItemList>
      </ClayAutocomplete.DropDown>
      {loading && <ClayAutocomplete.LoadingIndicator />}
    </ClayAutocomplete>
  );
}

AutoComplete.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  itemSelected: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

AutoComplete.defaultProps = {
  data: [],
  value: '',
  itemSelected: null,
};
