const React = require('react');
const PropTypes = require('prop-types');

function PlayerPreview(props) {
  return (
    <div style={{textAlign:'center'}}>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      {props.children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

module.exports = PlayerPreview;