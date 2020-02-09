import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  InputGroup, Input, Row, Col,
} from 'reactstrap';
import AutoComplete from '../../AutoComplete';
import './Header.scss';

let inputTimeOut = 0;

const Header = () => {
  const { repositories, repository: { repo, formError } } = useSelector((state) => state.github);
  const [repository, setRepository] = useState(repo);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!repo) {
      setRepository('');
    }
  }, [repo]);

  function handleClickRepository({ name }, clearValue = false) {
    setRepository(name);
    dispatch({ type: 'FETCH_REPO_SAGA', payload: clearValue ? '' : name });
  }

  function handleChange({ target: { name, value } }) {
    if (name === 'repository') {
      handleClickRepository({ name: value }, true);
    } else {
      setUsername(value);
      // note: This setTimeOut is used to prevent many requests while user is typing
      if (inputTimeOut) clearTimeout(inputTimeOut);
      inputTimeOut = setTimeout(() => {
        if (value && value.length >= 2) {
          dispatch({ type: 'FETCH_USER_REPOS_SAGA', payload: value });
        }
      }, 400);
    }
  }

  return (
    <div className="Header">
      <div className="heading">
        <Row>
          <Col xs={9} xl={4}>
            <InputGroup>
              <Input
                value={username}
                invalid={formError}
                onChange={handleChange}
                className="custom-input"
                placeholder="Liferay"
                name="username"
              />
            </InputGroup>
          </Col>
        </Row>
        <AutoComplete
          onClickItem={handleClickRepository}
          onChange={handleChange}
          itemSelected={repo}
          data={repositories}
          value={repository}
          name="repository"
        />
      </div>
    </div>
  );
};

export default Header;
