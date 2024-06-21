// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CARNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256[]) private _ownedTokens;

    constructor() ERC721("cars","C") {}

    function mint(address to, string memory tokenURI) external {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _ownedTokens[to].push(newTokenId);
    }

    function safeTransferUpdate(address from, address to) public {
        // require(_ownedTokens[to].length == 0, "Recipient can only receive tokens once");
        uint256 tokenId = _ownedTokens[from][0]; // Get the first token ID owned by 'from'
        super.safeTransferFrom(from, to, tokenId);
        _removeTokenId(from, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        _tokenURIs[tokenId] = uri;
    }

    function _removeTokenId(address owner, uint256 tokenId) private {
        uint256[] storage tokenIds = _ownedTokens[owner];
        require(tokenIds.length > 0, "Owner has no tokens");
        require(tokenIds[0] == tokenId, "Token ID does not match the first token");
        
        for (uint256 i = 0; i < tokenIds.length - 1; i++) {
            tokenIds[i] = tokenIds[i + 1];
        }
        
        tokenIds.pop();
    }
}